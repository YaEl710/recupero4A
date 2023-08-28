document.addEventListener('DOMContentLoaded', function () {
    const ShowdivPrenota = document.getElementById('ShowdivPrenota');
    const ShowdivPrenotazioni = document.getElementById('ShowdivPrenotazioni');
    const divPrenota = document.getElementById('divPrenota');
    const divPrenotazioni = document.getElementById('divPrenotazioni');


    ShowdivPrenota.addEventListener('click', () => {
        divPrenota.style.display = 'flex';
        divPrenotazioni.style.display = 'none';
    });

    ShowdivPrenotazioni.addEventListener('click', () => {
        divPrenota.style.display = 'none';
        divPrenotazioni.style.display = 'flex';
    
        const tbodyPrenotazioni = document.getElementById('tbodyPrenotazioni');
    
        // Effettua la richiesta per ottenere i dati delle prenotazioni
        fetch('server/get_prenotazioni.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta delle prenotazioni');
                }
                return response.json();
            })
            .then(prenotazioni => {
                tbodyPrenotazioni.innerHTML = ''; // Pulisci il contenuto attuale della tabella
    
                prenotazioni.forEach(prenotazione => {
                    const tr = document.createElement('tr');
                    const periodoTd = document.createElement('td');
                    periodoTd.innerHTML = `${prenotazione.inizioSoggiorno}<br>${prenotazione.fineSoggiorno}`;
                    tr.appendChild(periodoTd);
    
                    const emailTd = document.createElement('td');
                    emailTd.textContent = prenotazione.email;
                    tr.appendChild(emailTd);
    
                    const stanzaTd = document.createElement('td');
                    stanzaTd.textContent = `N. ${prenotazione.codStanza}`;
                    tr.appendChild(stanzaTd);
    
                    const pagatoTd = document.createElement('td');
                    const iconSpan = document.createElement('span');
                    iconSpan.classList.add('material-symbols-outlined');
                    if(prenotazione.pagato==0){
                        iconSpan.textContent =  'money_off';
                    }else{
                        iconSpan.textContent = 'paid' ;
                    }
                    
                    pagatoTd.appendChild(iconSpan);
                    tr.appendChild(pagatoTd);
    
                    tbodyPrenotazioni.appendChild(tr);
                });
            })
            .catch(error => {
                console.error(error);
            });
    });
    

    

    // Funzione per gestire il click sul pulsante "Prenota"
    document.querySelector('#divPrenota button').addEventListener('click', () => {
        const dataDa = document.querySelector('#txtDataDa').value;
        const dataA = document.querySelector('#txtDataA').value;
        const selectedRoom = document.querySelector('.cardClick');
        const email = document.querySelector('#divPrenota input[type="email"]').value;

        if (dataDa && dataA && selectedRoom && email) {
          
        } else {
            
        }
    });

    // Funzione per gestire il click sull'icona di pagamento nelle prenotazioni effettuate
    const prenotazioniRows = document.querySelectorAll('#tbodyPrenotazioni tr');
    prenotazioniRows.forEach(row => {
        const icon = row.querySelector('.material-symbols-outlined');
        if (icon.textContent === 'money_off') {
            icon.addEventListener('click', () => {
                
            });
        }
    });
});



    // Funzione per gestire il click sull'icona di pagamento nelle prenotazioni effettuate
    const prenotazioniRows = document.querySelectorAll('#tbodyPrenotazioni tr');
    prenotazioniRows.forEach(row => {
        const icon = row.querySelector('.material-symbols-outlined');
        if (icon.textContent === 'money_off') {
            icon.addEventListener('click', () => {
                
            });
        }
    });

    function visualizzaCamereDispo() {
        
        const dataDa = document.querySelector('#txtDataDa').value;
        const dataA = document.querySelector('#txtDataA').value;
    
        loadAvailableRooms(dataDa, dataA);
    }

    async function loadAvailableRooms(dataDa, dataA) {
        try {
            const stanzeResponse = await fetch('server/get_stanze.php');
            if (!stanzeResponse.ok) {
                throw new Error('Errore nella richiesta delle stanze');
            }
            const stanzeDisponibili = await stanzeResponse.json();
    
            const roomContainer = document.getElementById('cardGroup'); 
            roomContainer.innerHTML = ''; 
    
            stanzeDisponibili.forEach(stanza => {
                const roomCard = document.createElement('div');
                roomCard.classList.add('card');
                roomCard.innerHTML = `
                    <div class="card">
                    <img src="img/camera.png">
                    <div class="dettagli">
                        <div>
                        <input type="checkbox" id="checkTv${stanza.codStanza}" ${stanza.tv === '1' ? 'checked' : ''}>
                            <label for="checkTv1">
                                <span class="material-symbols-outlined">tv</span>
                            </label>
                        </div>
                        <div>
                        <input type="checkbox" id="checkBalcone${stanza.codStanza}" ${stanza.balcone === '1' ? 'checked' : ''}>
                            <label for="checkBalcone1">
                                <span class="material-symbols-outlined">balcony</span>
                            </label>
                        </div>
                        <div>
                        <input type="checkbox" id="checkMare${stanza.codStanza}" ${stanza.vistaMare === '1' ? 'checked' : ''}>
                            <label for="checkMare1">
                                <span class="material-symbols-outlined">beach_access</span>
                            </label>
                        </div>
                        <div>
                        <input type="checkbox" id="checkMatrimoniale${stanza.codStanza}" ${stanza.matrimoniale === '1' ? 'checked' : ''}>
                            <label for="checkMatrimoniale1">
                                <span class="material-symbols-outlined">bed</span>
                            </label>
                        </div>
                        </div>
                        </div>
                `;
                roomContainer.appendChild(roomCard);
            });
    
           
            if (dataDa && dataA) {
                await loadPrenotazioni(dataDa, dataA);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    
    
  
    