package main

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Auth struct {
	Issuer        string
	Audience      string
	Secret        string
	TokenExpiry   time.Duration
	RefreshExpiry time.Duration
	CookieDomain  string
	CookiePath    string
	CookieName    string
}

type jwtUser struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type TokenPairs struct {
	Token        string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type Claims struct {
	jwt.RegisteredClaims
}

// Generates the JWT and Refresh pair
func (j *Auth) GenerateTokenPair(user *jwtUser) (TokenPairs, error) {
	// Create a token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set the claims of the token
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = fmt.Sprintf("%s %s", user.FirstName, user.LastName)
	claims["sub"] = fmt.Sprint(user.ID)
	claims["aud"] = j.Audience
	claims["iss"] = j.Issuer
	claims["iat"] = time.Now().UTC().Unix()
	claims["typ"] = "JWT"

	// Set the expiry for the JWT
	claims["exp"] = time.Now().UTC().Add(j.TokenExpiry).Unix()

	// Create the signed token
	signedAccessToken, err := token.SignedString([]byte(j.Secret))
	if err != nil {
		return TokenPairs{}, err
	}

	// Create the refresh token and the claims
	refreshToken := jwt.New(jwt.SigningMethodHS256)

	// Set the expiery of the refresh token

	// Create the signed refresh token

	// Create the token pairs and populate with signed tokens

	// Return the token pairs
}
