package main

import (
	"backend/internal/repository"
	"backend/internal/repository/dbrepo"
	"time"

	"flag"
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	DSN          string
	Domain       string
	DB           repository.DatabaseRepo
	auth         Auth
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
}

func main() {
	// set application config
	var app application

	// read from command line
	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5433 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "deepstonecrypt", "Signing Secret")
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "Signing Issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "Signing Audience")
	flag.StringVar(&app.CookieDomain, "jwt-cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "localhost", "Domain")
	//flag.StringVar(&app.Domain, "domain", "example.com", "Domain") // leave here for invalid cookie resolving. Fix later.
	flag.Parse()

	// connect to the database
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:            app.JWTIssuer,
		Audience:          app.JWTAudience,
		Secret:            app.JWTSecret,
		TokenExpiryTime:   time.Minute * 15,
		RefreshExpiryTime: time.Hour * 24,
		CookiePath:        "/",
		CookieName:        "refresh-token", // use this for now due to Chromium
		//CookieName:        "__Host-refresh-token", // use double underscore (ex: __ ) for older browser compatability, and, according to Trevor Sawler, more secure
		CookieDomain: app.Domain,
	}

	//app.Domain = "example.com" // dlete later

	log.Println("Starting application on port", port)

	// start a web server
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
