# Executare

**Inainte:** se va consulta "Adaugare API Key" pentru ca api-urile Google Maps sa functioneze corect.

Folosind un terminal:
- in folder-ul 'frontend' se va rula:
  - `npm install`
  - `npm run deploy`
- in folder-ul 'backend' se va rula:
  - `gradlew generateDatabase` (inainte de prima rulare sau oricand se doreste re-initializarea datelor, **poate dura cateva minute**)
  - `gradlew run`
  - o data ce backend-ul ruleaza se poate accesa site-ul pe adresa http://localhost:8080

## Adaugare API Key

API key-ul se obtine de pe sectiunea de Google Maps de pe Google Cloud services:
https://console.cloud.google.com/google/maps-apis/overview

Sunt necesare urmatoarele API-uri:
- Geolocation - pentru aflarea locatiei
- Static Map generation - pentru generarea hartii din e-mail

Dupa ce se obtine un api key (de la sectiunea 'Credentials' - https://console.cloud.google.com/google/maps-apis/credentials a proiectului Google Cloud), acesta se adauga aici astfel (inlocuieste '<api-key>' cu cheia obtinuta):
- se creeaza un fisier numit 'ApiKey.kt' in 'backend/src/main/kotlin/com/example/ApiKey.kt', care sa contina:

```kotlin
package com.example

@Suppress("unused")
class ApiKey {
    companion object {
        @JvmStatic
        fun getApiKey() = "<api-key>"
    }
}
```

- doar pentru rulare http request-uri din IntelliJ - se deschide 'Requests.http' in IntelliJ, sus se da click pe butonul de langa 'Run with:' - se alege 'Add Environment to Private File', apoi se adauga cheia in fiserul generat ('http-client.private.env.json') astfel incat sa arate ca mai jos:

```json
{
  "dev": {
    "api_key": "<api-key>"
  }
}
```
