<#-- @ftlvariable name="data" type="com.example.Email" -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Programare BCR</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <style>
        :root{
            font-family: 'Montserrat', sans-serif;
        }
        .container {
            position: relative;
            text-align: center;
            color: white;
        }
        .centered {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-80%, -50%);
        }
        .divvtext{
            padding-left: 5%;
        }
        .divv{
            color: #4040a9;
            max-width: 1100px;
            margin-inline: auto;
            text-align: left;
            align-items: center;
            padding-bottom: 20px;
            background-color: white;
            border-radius: 25px;
        }
        .button {
            background-color: white;
            margin-inline: auto;
            color: blue;
            text-align: center;
            text-decoration: none;
            padding: 10px 0 10px 0;
            font-size: 100%;
            font-family: 'Montserrat', sans-serif;
            border: none;
            cursor: pointer;
        }
        .button:hover {
            background-color: #afafaf;
        }
        .img {
            max-width: 1100px;
            margin-inline: auto;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            width: 100%;
            object-fit: cover;
        }
        .logo {
            max-width: 200px;
            width: 100%;
            margin-inline: auto;
            scale: 50%;
        }
        .footer {
            font-size: 75%;
            color: gray;
        }
        .mapBox {
            max-width: 70%;
            width: 85%;
            margin-inline: auto;
            outline-color: blue;
            border-radius: 35px;
            object-fit: cover;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .mapPhoto {

            margin-inline: auto;
            border-radius: 35px;
            width: 100%;
            object-fit: cover;
            border: 2px solid blue;
        }


    </style>

</head>
<body style="text-align: center; background-color:#e5e5e5">

<img class="logo" src="cid:logo" alt="BCR Logo">

<div class="divv">
    <div class="container">
        <img class="img" src="cid:programare" alt="reservation placeholder">
        <div class="centered"><b>Programarea ta la BCR</b></div>
    </div>

    <div class="divvtext">
        <p style="padding-bottom: 10px">Salut ${data.name},</p>
        <p style="padding-top: 10px; padding-bottom: 10px">Programarea ta la <b>${data.branch}</b> este confirmată.</p>

        <p style="padding-top: 10px; padding-bottom: 10px"><b>Detalii programare:</b></p>

        <p>Scopul vizitei: <b>${data.purpose}</b></p>
        <p>Locație: <b>${data.branch}</b></p>
        <p>Dată și interval orar: <b>${data.dateAndTime}</b></p>
        <p>Adresă: <b>${data.address}</b></p>

        <!--Poza cu maps-->
    </div>
    <div class="mapBox">
        <img class="mapPhoto" src="cid:map" alt="maps">
    </div>
    <div class="divvtext">
        <a class="button" target="_blank" href="${data.navigateLink}">Afișează traseul pe hartă</a>

        <p style="padding-top: 20px">Până când ne întâlnim, poți descărca și adăuga programarea în calendarul tău.</p>
        <a class="button" target="_blank" href="${data.calendarLink}">Adaugă în calendar</a>

        <p style="padding-top: 20px">În cazul în care nu poți ajunge la data și intervalul orar stabilit, te rugăm să anulezi întâlnirea.</p>
        <a class="button" target="_blank" href="${data.cancelAppointment}">Anulează vizita</a>
        <br>
        <br>
        <p style="padding-top: 20px">Cu drag,</p>
        <p>Echipa BCR</p>
    </div>
</div>

<div class="footer">
    <p>Acest mesaj a fost generat automat, te rugăm să nu dai reply.</p>
    <br>
    <p>Pentru orice intrebare, scrie-ne un email la <a href="mailto:contact.center@bcr.ro">contact.center@bcr.ro</a> sau sună-ne la *2227.</p>
</div>

<img class="logo" src="cid:logo" alt="BCR Logo">

</body>
</html>