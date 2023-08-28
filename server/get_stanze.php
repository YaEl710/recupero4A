<?php
$conn = new mysqli("localhost",  "root", "", "debito");

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Esegui la query per ottenere le informazioni sulle stanze
$sql = "SELECT codStanza, tv, balcone, vistaMare, matrimoniale FROM stanze";
$result = $conn->query($sql);

$stanzeDisponibili = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Aggiungi le informazioni della stanza all'array
        $stanza = array(
            "codStanza" => $row["codStanza"],
            "tv" => $row["tv"],
            "balcone" => $row["balcone"],
            "vistaMare" => $row["vistaMare"],
            "matrimoniale" => $row["matrimoniale"]
        );
        array_push($stanzeDisponibili, $stanza);
    }
}

// Chiudi la connessione al database
$conn->close();

// Restituisci le informazioni delle stanze come JSON
header("Content-Type: application/json");
echo json_encode($stanzeDisponibili);
?>