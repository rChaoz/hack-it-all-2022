# Executare

**Inainte:** se va consulta "Adaugare API Key" pentru ca api-urile Google Maps sa functioneze corect si "Adaugare cont Email" pentru ca trimiterea mail-ului de confirmare sa functioneze corect.

Folosind un terminal:
- in folder-ul 'frontend' se va rula:
  - `npm install`
  - `npm run deploy`
- in folder-ul 'backend' se va rula:
  - `gradlew generateDatabase` (inainte de prima rulare sau oricand se doreste re-initializarea datelor, **poate dura cateva minute**)
  - `gradlew run`
  - o data ce backend-ul ruleaza se poate accesa site-ul pe adresa http://localhost

## Adaugare API Key

API key-ul se obtine de pe sectiunea de Google Maps de pe Google Cloud services:
https://console.cloud.google.com/google/maps-apis/overview

Sunt necesare urmatoarele API-uri:
- Geolocation - pentru aflarea locatiei
- Static Map generation - pentru generarea hartii din e-mail

Dupa ce se obtine un api key (de la sectiunea 'Credentials' - https://console.cloud.google.com/google/maps-apis/credentials a proiectului Google Cloud), acesta se adauga aici astfel (inlocuieste '<api-key>' cu cheia obtinuta):
- se creeaza daca nu exista un fisier numit 'ApiKey.kt' in 'backend/src/main/kotlin/com/example/ApiKey.kt', in care se adauga metoda statica 'getApiKey()' astfel:

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

## Adaugare cont E-mail
Pentru a se trimite un e-mail, este necesar un cont de mail si un server SMTP cu care sa se trimita mail-ul. Pentru a folosi un cont personal de gmail, procesul este urmatorul:
- contul de google trebuie sa aiba 2-step authentication activat (se poate activa pe pagina contului: https://myaccount.google.com/security)
- apoi, trebuie creat un "app password" (aceeasi pagina de mai sus - se da pe "App passwords", se creeaza o noua cu setarile: App - 'Mail', Device - 'Other'), aceasta parola are 16 caractere
- in fisierul 'ApiKey.kt' (se creeaza daca nu exista) din 'backend/src/main/kotlin/com/example/ApiKey.kt', se adauga metoda statica 'getSmtpCredentials()' astfel:

```kotlin
package com.example

@Suppress("unused")
class ApiKey {
  companion object {
    @JvmStatic
    fun getSmtpCredentials() = net.axay.simplekotlinmail.data.SMTPLoginInfo("smtp.gmail.com", 465, "<adresa-de-gmail>", "<parola-generata>")
  }
}
```

- pentru folosirea altor servicii de mail (e.g. Outlook) se va consulta documentatia pentru trimiterea de mail prin SMTP (adresa server, port SSL, cum se obtine user si parola)

**Atentie!** Fisierul 'ApiKey.kt' poate contine ambele metode, de exemplu:

```kotlin
package com.example

import net.axay.simplekotlinmail.data.SMTPLoginInfo

@Suppress("unused")
class ApiKey {
    companion object {
        @JvmStatic
        fun getApiKey() = "mjdshfoiuasgdUSMAGDOUIGASasgkasugd"
        @JvmStatic
        fun getSmtpCredentials() = SMTPLoginInfo("smtp.gmail.com", 465, "adresa_mea@gmail.com", "abcdefghijklmnop")
    }
}
```

## Accesare baza de date
Pentru a vizualiza baza de date, este necesara versiunea premium IntelliJ (Ultimate), nu Community. Se deschide proiectul 'backend', trebuie sa se fi generat baza de date inainte (`gradlew generateDatabase`), apoi:
- se deschide tab-ul Database (View -> Tool windows -> Database)
- se da click pe + (New) si se alege 'Data source from Path'
- se alege fisierul 'backend/build/db.mv.db' din folder-ul proiectului
- se alege driver-ul H2 (si se instaleaza atunci cand IntelliJ intreaba), se da OK la fereastra
- se da refresh cu butonul de langa + (Plus)
- se deschide db -> DB -> PUBLIC -> tables, aici se pot vedea toate datele (dublu click pe un tabel pentru a-l vedea)

**Important:** atunci cand ruleaza server-ul, trebuie dezactivat Database view-ul din Intellij (cu butonul Stop (Deactivate) de langa cel de Refresh); altfel, server-ul o sa crape la pornire sau cand incearca sa faca o scriere/citire!