<?php
$conn = new mysqli("localhost",  "root", "", "debito");

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Esegui la query per ottenere le prenotazioni
$sql = "SELECT inizioSoggiorno, fineSoggiorno, codStanza,email,pagato FROM prenotazioni";
$result = $conn->query($sql);

$prenotazioni = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Aggiungi le informazioni della prenotazione all'array
        $prenotazione = array(
            "inizioSoggiorno" => $row["inizioSoggiorno"],
            "fineSoggiorno" => $row["fineSoggiorno"],
            "email" => $row["email"],
            "pagato" => $row["pagato"],
            "codStanza" => $row["codStanza"]
        );
        array_push($prenotazioni, $prenotazione);
    }
}

// Chiudi la connessione al database
$conn->close();

// Restituisci le informazioni delle prenotazioni come JSON
header("Content-Type: application/json");
echo json_encode($prenotazioni);
?>
