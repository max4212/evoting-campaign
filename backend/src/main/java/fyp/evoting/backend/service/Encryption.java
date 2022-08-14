package fyp.evoting.backend.service;

import java.math.BigInteger;
import java.util.Random;
import java.lang.Math;

public class Encryption {

    /* p and q are two large primes
    lambda = lcm(p-1, q-1) = (p-1)*(q-1)/gcd(p-1, q-1). */
    private BigInteger p, q, lambda;

    /* n = p*q */
    private BigInteger n;

    /* nSquare = n*n */
    private BigInteger nSquare;

    /* a random integer in Z*_{n^2}, where gcd(L(g^lambda mod n^2), n) = 1. */
    private BigInteger g;

    /* modular inverse, as sk. */
    private BigInteger u;

    /* the bit-length of modulus. */
    private int bitLength;

    /* to generate 'g', small g can speed up encryption. */
    private int randomRange = 50;

    /* bigX in g^nx for self-blinding. */
    private BigInteger bigX;

    public BigInteger getP() {
        return p;
    }

    public BigInteger getQ() {
        return q;
    }

    public BigInteger getLambda() {
        return lambda;
    }

    public BigInteger getN() {
        return n;
    }

    public BigInteger getnSquare() {
        return nSquare;
    }

    public BigInteger getG() {
        return g;
    }

    public BigInteger getU() {
        return u;
    }

    public int getBitLength() {
        return bitLength;
    }

    public BigInteger getBigX() {
        return bigX;
    }

    /**
     * define L(x) = (x-1)/n;  n=p*q
     * @param x x
     * @return
     */
    public BigInteger L(BigInteger x) {
        return  (x.subtract(BigInteger.ONE)).divide(n);
    }


    /** to probably generate primes. pk: (n, g); sk: (lambda, u)
     * @param bitLength the big-length of modulus
     * @param certainty the probability to generate a prime number will exceed (1 - (1/2)^certainty)
     * @return g
     */
    public BigInteger Keygen(int bitLength, int certainty) 
    {
    	this.bitLength = bitLength;

        /* p and q are primes */
        this.p = new BigInteger(bitLength/2, certainty, new Random());
        this.q = new BigInteger(bitLength/2, certainty, new Random());

        /* n = p*q */
        this.n = p.multiply(q);
        return nSquare = n.multiply(n);
    }
    public BigInteger Lambdagen() 
    {
    	/* lambda = lcm(p-1, q-1) = (p-1)*(q-1)/gcd(p-1, q-1). */
        return lambda = ((p.subtract(BigInteger.ONE)).multiply(q.subtract(BigInteger.ONE)))
                .divide((p.subtract(BigInteger.ONE)).gcd(q.subtract(BigInteger.ONE)));
    }
    
    public BigInteger KeyGen(int bitLength, int certainty) {
    	this.nSquare=Keygen(bitLength,certainty);
        this.lambda=Lambdagen();
        
        /* g is a random in [0, nSquare), where gcd(L(g^lambda mod n^2), n) = 1.
        *  Attention, if g=2 or small g can speed up encryption.
        * */
//        g = new BigInteger(String.valueOf( (int) (Math.random()*randomRange)));
        g =  new BigInteger("2");

        /* check whether g is ok, gcd(L(g^lambda mod n^2), n) = 1 */
        if ((g.intValue() < 0) || (L(g.modPow(lambda, nSquare)).gcd(n).intValue() != 1)) {
//            System.out.println("g is not ok. g = " + g + ". try again.");
            KeyGen(bitLength, certainty);
        }

        u = L(g.modPow(lambda, nSquare)).modInverse(n);

        return g;
    }
    
    public BigInteger KeyGen(BigInteger nsquare, BigInteger lambda) {
    	this.nSquare=nsquare.abs();
        this.lambda=lambda;
        this.n=nSquare.sqrt();
        /* g is a random in [0, nSquare), where gcd(L(g^lambda mod n^2), n) = 1.
        *  Attention, if g=2 or small g can speed up encryption.
        * */
//        g = new BigInteger(String.valueOf( (int) (Math.random()*randomRange)));
        g =  new BigInteger("2");
        
        if ((g.intValue() < 0) || (L(g.modPow(lambda, nSquare)).gcd(n).intValue() != 1)) {
//          System.out.println("g is not ok. g = " + g + ". try again.");
          KeyGen(nsquare,lambda);
      }
        u = L(g.modPow(lambda, nSquare)).modInverse(n);

        return g;
    }


    /**
     * Encrypt plaintext m with given r. ciphertext c = (g^m * r^n) mod n^2
     * @param m plaintext
     * @param r random
     * @return ciphertext
     */
    public BigInteger Encrypt (BigInteger m, BigInteger r) {
        System.out.println("r:" + r);
        return g.modPow(m, nSquare).multiply(r.modPow(n, nSquare)).mod(nSquare);
    }
	

    /**
     * Encrypt plaintext m with auto-generated r. ciphertext c = (g^m * r^n) mod n^2
     * @param m plaintext
     * @return ciphertext
     */
    public BigInteger Encrypt (BigInteger m) {
        BigInteger r = new BigInteger(bitLength, new Random());
        return Encrypt(m, r);
    }
    public BigInteger Encrypt (BigInteger m, int bitLength) {
        BigInteger r = new BigInteger(bitLength, new Random());
        return Encrypt(m, r);
    }

    public BigInteger Encrypt (BigInteger m, int rndR, boolean isSeed) {
        BigInteger bigR;     // 'r' in E(m)=g^m*r^n

        if (isSeed) {  // 'rndR' is random bits seed to generate BigInteger
            int rnd = (int) (Math.random()*rndR)+1;    // [1, rndR]
            bigR = new BigInteger(String.valueOf(rnd));
            return Encrypt(m, bigR);
        } else {
            bigR = new BigInteger(String.valueOf(rndR));
            return Encrypt(m, bigR);
        }
    }


    /**
     * Decrypt ciphertext c. plaintext m = (L(c^lambda mod n^2) * u) mod n
     * @param c ciphertext
     * @return plaintext
     */
    public BigInteger Decrypt (BigInteger c) {
        return L(c.modPow(lambda, nSquare)).multiply(u).mod(n);
    }

    /** Decrypt ciphertext c in specified parameters. This means that we can pre-store the parameter in somewhere, then we
     *  decrypt the ciphertext by this function.
     */
    public BigInteger Decrypt (BigInteger c, BigInteger lambda, BigInteger nSquare, BigInteger u, BigInteger n) {
        return L(c.modPow(lambda, nSquare)).multiply(u).mod(n);
    }

    /**
     * Addictive homomorhphic encryption: cipertext multiplication refers to plaintext addiction.
     * @param c1 ciphertext 1
     * @param c2 ciphertext 2
     * @return multiplied ciphertext
     */
    public BigInteger CiperMultiply (BigInteger c1, BigInteger c2) {
        return c1.multiply(c2).mod(nSquare);
    }
    public BigInteger CiperMultiply (BigInteger c1, BigInteger c2, BigInteger nsquare) {
        return c1.multiply(c2).mod(nsquare);
    }
    


/*
    public static void main (String[] args) {
    	
        Encryption paillier = new Encryption();
    
        BigInteger key = paillier.KeyGen(32, 64);
        Scanner input = new Scanner(System.in);
        
        // Simple voting system, to be taken out when implemented
        System.out.println("Choose one option : A B C ");
        String str1 = input.nextLine();
        
        int testing1 = 1;
        if (str1.equals("A")) {
        	testing1 = 1;
        }else if (str1.equals("B")) {
        	testing1 = 100;
        }else if (str1.equals("C")) {
        	testing1 = 10000;
        }
       
        System.out.println("Choose one option : A B C ");
        String str2 = input.nextLine();
        
        int testing2 = 1;
        if (str2.equals("A")) {
        	testing2 = 1;
        }else if (str2.equals("B")) {
        	testing2 = 100;
        }else if (str2.equals("C")) {
        	testing2 = 10000;
        }
        System.out.println("Choose one option : A B C ");
        String str3 = input.nextLine();
        
        int testing3 = 1;
        if (str3.equals("A")) {
        	testing3 = 1;
        }else if (str3.equals("B")) {
        	testing3 = 100;
        }else if (str3.equals("C")) {
        	testing3 = 10000;
        }
        System.out.println("Choose one option : A B C ");
        String str4 = input.nextLine();
        input.close();
        
        int testing4 = 1;
        if (str4.equals("A")) {
        	testing4 = 1;
        }else if (str4.equals("B")) {
        	testing4 = 100;
        }else if (str4.equals("C")) {
        	testing4 = 10000;
        }
        String testing11 = String.valueOf(testing1);
        String testing22 = String.valueOf(testing2);
        String testing33 = String.valueOf(testing3);
        String testing44 = String.valueOf(testing4);
        
        System.out.println("Voter 1 chooses:" + str1);
        System.out.println("Voter 2 chooses:" + str2);
        System.out.println("Voter 2 chooses:" + str3);
        System.out.println("Voter 2 chooses:" + str4);
        BigInteger m1 = new BigInteger(testing11);
        BigInteger m2 = new BigInteger(testing22);
        BigInteger m3 = new BigInteger(testing33);
        BigInteger m4 = new BigInteger(testing44);
        System.out.println("p: " + paillier.getP() + ", q: " + paillier.getQ() + ", n: " + paillier.getN() +
        ", g: " + paillier.getG() + ", lambda: " + paillier.getLambda() + ", u: " + paillier.getU());
        /**
         * PROPERTY ONE: additive homomorphic encryption.
         *  E(m1)*E(m2) = E(m1+m2).
         **/
    /*
        System.out.println("\n1. Additive homomorphic encryption");
        BigInteger c1 = paillier.Encrypt(m1);
        BigInteger c2 = paillier.Encrypt(m2);
        BigInteger c3 = paillier.Encrypt(m3);
        BigInteger c4 = paillier.Encrypt(m4);
        BigInteger c = paillier.CiperMultiply(c1, c2);
        BigInteger cc = paillier.CiperMultiply(c3, c4);
        BigInteger ccc = paillier.CiperMultiply(c, cc);
        System.out.println("c1(E(m1)): " + c1); 
        System.out.println("c2(E(m2)): " + c2);
        System.out.println("c3(E(m3)): " + c3);
        System.out.println("c4(E(m4)): " + c4);
        System.out.println("c(E(m1)*E(m2)*E(m3)*E(m4)): " + ccc);
        System.out.println("Decryption of the product of all encryption: " + paillier.Decrypt(ccc));
       
*/
    }