package main

import (
	"log"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type VerifyAndSignPayload struct {
	Address   string `json:"address"`
	Signature string `json:"signature"`
	Message   string `json:"message"`
}

func (v *VerifyAndSignPayload) Verify() bool {
	sig := hexutil.MustDecode(v.Signature)

	msg := accounts.TextHash([]byte(v.Message))
	if sig[crypto.RecoveryIDOffset] == 27 || sig[crypto.RecoveryIDOffset] == 28 {
		sig[crypto.RecoveryIDOffset] -= 27 // Transform yellow paper V from 27/28 to 0/1
	}

	recovered, err := crypto.SigToPub(msg, sig)
	if err != nil {
		return false
	}

	recoveredAddr := crypto.PubkeyToAddress(*recovered)

	return v.Address == recoveredAddr.Hex()
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// sk := os.Getenv("PRIVATE_KEY")
	// if sk == "" {
	// 	log.Fatal("PRIVATE_KEY is not set")
	// }

	// privateKey, err := crypto.HexToECDSA(sk)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// publicKey := privateKey.Public()
	// publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	// if !ok {
	// 	log.Fatal("error casting public key to ECDSA")
	// }

	// fmt.Print(publicKeyECDSA)

	app := fiber.New()

	app.Post("/verify-and-sign", func(c *fiber.Ctx) error {
		payload := VerifyAndSignPayload{}
		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		return c.JSON(payload.Verify())
	})

	app.Listen(":3000")
}
