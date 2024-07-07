

 window.onload = function() { // Chiamata alle funzioni di ripristino
    
	//salvaStrutturaLocalStorage();
	ripristinaIndici(); //funziona
	estraiButtonAddEvent();
	ripristinaTabella(); //funziona
    
	ripristinaStrutturaLocalStorage();
	
	
	
}; 
// Chiudi la modal quando l'utente clicca sulla "x"
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

// Chiudi la modal quando l'utente clicca fuori dalla modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




			//------------------------------------------------------------
			// SEZIONE CREAZIONE TABELLA INIZIALE
			//------------------------------------------------------------


function aggiungiRiga() {
    var table = document.getElementById("myTable");
    var rowsCount = table.rows.length; // Numero di righe nella tabella

    // Se la tabella ha più di una riga, aggiungi il pulsante "Elimina"
    if (rowsCount > 2) {
        var row = table.insertRow(-1); // Aggiunge una riga alla fine della tabella
    } else {
        // Se la tabella ha solo una riga, prendi la riga esistente
        var row = table.rows[0];
    }

    // Chiedi all'utente di inserire i valori per ciascuna cella
    var valore1 = prompt("Inserisci il valore per la colonna 1:");
    var valore2 = prompt("Inserisci il valore per la colonna 2:");
    var valore3 = prompt("Inserisci il valore per la colonna 3:");
    var valore4 = prompt("Inserisci il valore per la colonna 4:");

    var valore5 = prompt("Inserisci il valore per la colonna 5:");
    var valore6 = prompt("Inserisci il valore per la colonna 6:");
    var valore7 = prompt("Inserisci il valore per la colonna 7:");
    
	

    // Aggiungi celle alla riga e imposta i valori inseriti dall'utente
    var cell1 = row.insertCell(0);
    cell1.innerHTML = valore1;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = valore2;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = valore3;
    var cell4 = row.insertCell(3);
    cell4.innerHTML = valore4;

    var cell5 = row.insertCell(4);
    cell5.innerHTML = valore5;
	var cell6 = row.insertCell(5);
    cell6.innerHTML = valore6;
	var cell7 = row.insertCell(6);
    cell7.innerHTML = valore7;


	
    // Se la tabella ha più di una riga, aggiungi il pulsante "Elimina"
    if (rowsCount > 1) {
        // Aggiungi il pulsante "Elimina" alla riga
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Elimina";
        deleteButton.setAttribute("onclick", "eliminaRiga(this)");
        var cell8 = row.insertCell(7);
        cell5.appendChild(deleteButton);
    }

    // Salva lo stato della tabella nel localStorage
    salvaStatoTabella();
}

function eliminaRiga(button) {
    // Trova la riga padre del pulsante
    var row = button.parentNode.parentNode;
	
	
    
    // Trova la tabella a cui appartiene la riga
    var table = row.parentNode;

    // Trova l'indice della riga da eliminare
    var rowIndex = row.rowIndex-1;

//console.log("righe",row.rowIndex);
    // Rimuovi la riga dalla tabella
    table.deleteRow(rowIndex);
    
    // Salva lo stato aggiornato della tabella
    salvaStatoTabella();
}

function aggiungiColonna() {
    // Aggiungi il th per la nuova colonna nell'elemento thead
    var tableHeader = document.querySelector('#myTable thead tr');
    var newTh = document.createElement('th');
    newTh.textContent = 'Nuova Colonna';
    tableHeader.appendChild(newTh);
    
    // Per ogni riga nella tbody, aggiungi una nuova td corrispondente alla nuova colonna, anche se inizialmente vuota
    var tableBody = document.querySelector('#myTable tbody');
    var rows = tableBody.querySelectorAll('tr');
    rows.forEach(function(row) {
        var newTd = document.createElement('td');
        row.appendChild(newTd);
    });
}


			//------------------------------------------------------------
			// SEZIONE PER SALVARE E RIPRISTINARE LA TABELLA E GLI INDICI
			//------------------------------------------------------------
			
			
function salvaStatoTabella() { // TABELLA INIZIALE
	var table = document.getElementById("myTable");
	var tableHTML = table.innerHTML;
	localStorage.setItem("tabellaHTML", tableHTML);
}

function ripristinaTabella() {
	var table = document.getElementById("myTable");
	var tableHTML = localStorage.getItem("tabellaHTML");
	if (tableHTML) {
		table.innerHTML = tableHTML;
	}
}

function salvaStatoIndici() { // TABELLA INDICI
	//console.log("salvo indice");
    var indexContainer = document.querySelector(".index-container");
	//console.log("[salvaStatoIndici]   ",indexContainer);
    var indexHTML = indexContainer.innerHTML;
    localStorage.setItem("indiciHTML", indexHTML);
	//console.log(localStorage.getItem("indiciHTML"));
}

function ripristinaIndici() {
	//console.log("Ripristino indice");
    
    var indexHTML = localStorage.getItem("indiciHTML");
    if (indexHTML) {
		var indexContainer = document.querySelector(".index-container");
        indexContainer.innerHTML = indexHTML;
    }
}


			//------------------------------------------------------------
			// SEZIONE PER CREARE ED ELIMINARE PARAGRAFI/CAPITOLI
			//------------------------------------------------------------

function aggiungiCapitolo() {
		 
		var chapter = document.createElement("div");
		chapter.classList.add("chapter-container");
		chapter.id = "DIN" + new Date().getTime(); // Imposta l'id del capitolo

		var titoloElemento = document.createElement("div");
		titoloElemento.classList.add("chapter-title");
		var titoloCapitolo = prompt("Inserisci il titoloCapitolo:");if (!titoloCapitolo) {return;}
		
		var numCap=getNumCapitolo()+1;
		
		titoloCapitolo="CAP "+numCap+" - "+titoloCapitolo;
		
		
		titoloElemento.textContent = titoloCapitolo+"("+chapter.id+")";

		var aggiungiParagrafoButton = document.createElement("button");
		aggiungiParagrafoButton.classList.add("chapter-button");
		aggiungiParagrafoButton.textContent = "Aggiungi Paragrafo";
		aggiungiParagrafoButton.onclick = function() {aggiungiParagrafo(chapter.id);};
		
		var eliminaParagrafoButton = document.createElement("button");
		eliminaParagrafoButton.classList.add("chapter-button");
		eliminaParagrafoButton.textContent = "Elimina Paragrafo";
		eliminaParagrafoButton.onclick = function() {eliminaParagrafo(chapter.id);};

		
		chapter.appendChild(titoloElemento);
		chapter.appendChild(aggiungiParagrafoButton);
		chapter.appendChild(eliminaParagrafoButton);		
		
		document.body.appendChild(chapter);
		
		// Chiedi all'utente se desidera aggiungere un paragrafo al capitolo appena creato
		var confermaAggiuntaParagrafo = confirm("Vuoi aggiungere un paragrafo a questo capitolo?");

		// Se l'utente conferma l'aggiunta del paragrafo, richiama la funzione ad-hoc

		if (confermaAggiuntaParagrafo) {
			
			// Chiamata alla tua funzione ad-hoc
			var parag=aggiungiParagrafo(chapter.id);
		}

		var indexList = document.querySelector('.index-list');
		var newItem = document.createElement("li");
		newItem.classList.add("index-item");
		newItem.innerHTML = '<a href="#' + chapter.id + '">' + titoloCapitolo + '</a>';
		
		if (parag)
		{
		// Crea la struttura per la lista dei paragrafi
			
			var paragraphsList = document.createElement("ul");
			paragraphsList.classList.add("paragraphs-list");

			var listItem = document.createElement("li");
			listItem.innerHTML = '<a href="#' + parag.id + '">'+parag.title+ '</a>';
			// Aggiungi il nuovo elemento per il capitolo e la lista dei paragrafi alla lista degli indici
			paragraphsList.appendChild(listItem);
			newItem.appendChild(paragraphsList);
			
		}
		console.log("[aggiungiCapitolo]  :  aggiungo item all'indice",newItem);
		indexList.appendChild(newItem);
		console.log("[aggiungiCapitolo]  :  salvo stato indice");
		salvaStatoIndici();
		console.log("[aggiungiCapitolo]  :  salvo stato pagina");
		salvaStrutturaLocalStorage();
}

function aggiungiParagrafo(chapterID) {
	
	var chapter = document.getElementById(chapterID);
	console.log("--------",chapterID);
	
	// RICHIESTA PARAMETRI DI INPUT
	
    var titoloParagrafo = prompt("Inserisci il titolo del paragrafo:");if (!titoloParagrafo) {return;}

	var attrPar=getNumParagrafo(chapterID);
	
	var codiceParagrafo=attrPar[1]+"."+attrPar[0];

	titoloParagrafo="PAR "+codiceParagrafo+" - "+titoloParagrafo;

    var queryCode = prompt("Inserisci il codice della query PLSQL:");if (!queryCode) {return;}

	var sectionCsv = prompt("Inserisci la tabella in formato CSV (utilizza il tab come separatore):");if (!sectionCsv) return;

	
	// CREAZIONE OGGETTO PARAGRAFO CON ID DINAMICO
	var paragrafId="DIN" + new Date().getTime();
	
	var section = document.createElement("div");
	section.classList.add("section");
	section.id=paragrafId;	
	
	
			//section-column1
	
	
				
	var columnDiv = document.createElement("div");
	columnDiv.classList.add("section-column1");

	
	var elementHr = document.createElement("hr");

	var titleDiv = document.createElement("div");
	titleDiv.classList.add("section-title");
	titleDiv.textContent = titoloParagrafo + " (" + paragrafId + ")";
	titleDiv.appendChild(elementHr);

	var codePre = document.createElement("pre");
	var code = document.createElement("code");
	code.classList.add("language-sql");
	code.textContent = queryCode;
	codePre.appendChild(code);


	
	var copiaCodeButton = document.createElement('button');
	copiaCodeButton.classList.add('chapter-button');
	copiaCodeButton.textContent = 'Copia codice';
	copiaCodeButton.onclick = function() {
		copiaCode(paragrafId);
	};
	
	//aggiungo tasto  modifica code
	//----------------------------------------------
	var modificaCodeButton = document.createElement('button');
	modificaCodeButton.classList.add('chapter-button');
	modificaCodeButton.textContent = 'Modifica codice';
	modificaCodeButton.onclick = function() {
		modificaCode(paragrafId);
	};
	
	var tornaInizio = document.createElement('button');
	tornaInizio.classList.add('chapter-button');
	tornaInizio.textContent = 'Torna inizio';
	tornaInizio.onclick = function() {
		tornaAllInizio();
	};
	
	
	//----------------------------------------------	
	
	
	columnDiv.appendChild(titleDiv);
	columnDiv.appendChild(codePre);
	columnDiv.appendChild(copiaCodeButton);
	columnDiv.appendChild(modificaCodeButton); //aggiunto tasto modifica codice
	
	
	
			//section-column2
			
	var columnDiv2 = document.createElement("div");
	
	columnDiv2.classList.add("section-column2");

	var table =(
		function() 
		{
				var table = document.createElement("table");
				var rows = sectionCsv.trim().split("\n");
				var thead = document.createElement("thead");
				var tbody = document.createElement("tbody");

				//table.style.fontSize = "8px";

				rows.forEach(function(row, rowIndex) {
					var cells = row.split("\t");
					var tr = document.createElement("tr");
					cells.forEach(function(cell, cellIndex) {
						var cellElement = rowIndex === 0 ? document.createElement("th") : document.createElement("td");
						cellElement.textContent = cell.trim();
						tr.appendChild(cellElement);
					});
					if (rowIndex === 0) {
						thead.appendChild(tr);
					} else {
						tbody.appendChild(tr);
					}
				});

				table.appendChild(thead);
				table.appendChild(tbody);


				// Aggiungi classe alla prima riga per rendere le celle celesti
				table.querySelector("tr").classList.add("first-row");
				return table;
		} )();
	
	//console.log(table);
	columnDiv2.appendChild(table);
	section.appendChild(columnDiv);
	section.appendChild(columnDiv2);
	chapter.appendChild(section);
	

	
	
	// AGGIORNA INDICE 
	
    var capitoloIndexItem = document.querySelector('.index-item a[href="#' + chapterID + '"]');
    if (capitoloIndexItem) {
        // Crea un nuovo elemento per la lista dei paragrafi
        var listaParagrafi = document.createElement('ul');
        listaParagrafi.classList.add('paragraphs-list');
        
        // Crea un nuovo elemento per il paragrafo
        var nuovoParagrafo = document.createElement('li');
        nuovoParagrafo.innerHTML = '<a href="#' + paragrafId + '">' + titoloParagrafo + '</a>';
        
        // Aggiungi il nuovo paragrafo alla lista dei paragrafi
        listaParagrafi.appendChild(nuovoParagrafo);
        
        // Aggiungi la lista dei paragrafi come figlio dell'elemento index-item
        capitoloIndexItem.parentElement.appendChild(listaParagrafi);
    }
	salvaStatoIndici();
	salvaStrutturaLocalStorage();
	 return { id: paragrafId, title: titoloParagrafo };
}

function eliminaParagrafo(elementId) {
    // Chiedi all'utente di inserire l'ID del paragrafo da eliminare
	console.log("----->> ",elementId);
	
	
    var paragraphID = prompt("Inserisci l'ID del paragrafo/capitolo da eliminare:");
    if (!paragraphID) {
        return; // Se l'utente ha cliccato su "Annulla" o ha lasciato vuoto, esci dalla funzione
    }

	//---------------------------------------------------------- gestione nuova

	var elementObject = document.getElementById(elementId);
	if (elementObject && elementObject.classList.contains('chapter-container')) {
        // Si tratta di un capitolo, non fare nulla o esegui un'azione per l'eliminazione del capitolo
        console.log("Elemento con ID", elementId, "è un capitolo.");
		} else {
		console.log("Elemento con ID", elementId, "è un paragrafo.");
		}
		
	var elementObject2 = document.getElementById(paragraphID);
	if (elementObject2 && elementObject2.classList.contains('chapter-container')) {
        // Si tratta di un capitolo, non fare nulla o esegui un'azione per l'eliminazione del capitolo
        console.log("Elemento con ID", paragraphID, "è un capitolo.");
		} else {
		console.log("Elemento con ID", paragraphID, "è un paragrafo.");
		}		

	if (elementObject && elementObject2 && elementObject.contains(elementObject2)) {
			console.log("Elemento con ID", paragraphID, "è dentro l'elemento",elementId);
		} else {
			alert("Elemento con ID NON è dentro l'elemento");
			return ;
		
		}		
//----------------------------------------------------------







	//se il paragrafo è statico non lo elimino
    if (paragraphID.toLowerCase().startsWith("id")||paragraphID.toLowerCase().startsWith("chapter1")) {
        alert('Impossibile eliminare Capitolo / Paragrafo statico!');
		return; 
    }















    // Rimuovi il paragrafo dal capitolo
    var paragraph = document.getElementById(paragraphID);
    if (paragraph) {
        paragraph.remove();
    } else {
        //console.log("Paragrafo non trovato!");
    }

    // Rimuovi il paragrafo dall'indice
    var indexItem = document.querySelector('.index-item a[href="#' + paragraphID + '"]');
    if (indexItem) {
        indexItem.parentElement.remove();
    }
	salvaStrutturaLocalStorage()
	salvaStatoIndici() ;
	//window.location.reload();
}

function copiaCode(paragrafId) {
    // Trova l'elemento <code> corrispondente all'ID del paragrafo
	//console.log(".................",paragrafId);
    var codeContent = document.querySelector('#' + paragrafId + ' code').textContent;
    
    // Copia il contenuto del codice negli appunti
    navigator.clipboard.writeText(codeContent)
        .then(() => {
            alert('Contenuto del codice copiato negli appunti!');
        })
        .catch(err => {
            console.error('Errore nella copia del contenuto del codice:', err);
        });
}

function modificaCode(paragrafoId) {

	if (paragrafoId.toLowerCase().startsWith("id")||paragrafoId.toLowerCase().startsWith("chapter1")){
			 alert('Impossibile modificare Capitolo / Paragrafo statico!');
	return;}

    var codeElement = document.querySelector('#' + paragrafoId + ' code');
	var currentCode = codeElement.textContent;
    // Mostra la modal
    var modal = document.getElementById("myModal");
    var textarea = document.getElementById("codeTextarea");
    var saveButton = document.getElementById("saveCodeButton");

    textarea.value = currentCode;
    modal.style.display = "block";

    // Salva il nuovo codice quando l'utente clicca sul pulsante "Salva"
    saveButton.onclick = function() {
        var newCode=textarea.value;
		codeElement.textContent = newCode;
        modal.style.display = "none";
		salvaStrutturaLocalStorage();
        //salvaStatoIndici();
    }
}

function tornaAllInizio() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Per una transizione fluida
    });
}


			//------------------------------------------------------------
			// SEZIONE PER SALVARE ED RIPRISTINARE			
			//------------------------------------------------------------


function salvaStrutturaLocalStorage() {
    // Ottieni la struttura della pagina
    var strutturaPagina = document.documentElement.outerHTML;
	
	//console.log("--->",strutturaPagina);

    // Salva la struttura nel localStorage con una chiave specifica
    localStorage.setItem('strutturaPaginaProva', strutturaPagina);

    // Notifica all'utente che la struttura è stata salvata
    //alert('Struttura della pagina salvata con successo nel localStorage!');
}

function ripristinaStrutturaLocalStorage() {
    // Ottieni la struttura salvata nel localStorage
    var strutturaPagina = localStorage.getItem('strutturaPaginaProva');

	if (strutturaPagina) {
			// Crea un div temporaneo
			var tempDiv = document.createElement('div');
			// Imposta l'innerHTML del div con la struttura salvata
			tempDiv.innerHTML = strutturaPagina;

			// Sostituisci il contenuto del body con il contenuto del div temporaneo
			document.body.innerHTML = tempDiv.innerHTML;

			// Aggiungi gli eventi onclick ai pulsanti "Copia codice"
			estraiButtonAddEvent();

			// Aggiungi un pulsante o un'altra azione per visualizzare la pagina aggiornata
			
			
			// Notifica all'utente che la struttura è stata ripristinata
			//alert('Struttura della pagina ripristinata con successo!');
		} else {
			// Se la struttura non è presente nel localStorage, notifica l'utente
			//alert('Nessuna struttura salvata. Impossibile ripristinare.');
		}
}

function estraiButtonAddEvent() {
    // Seleziona tutti i pulsanti "Copia codice" presenti nella struttura
    var pulsantiCopiaCodice = document.querySelectorAll('.chapter-button');

    // Itera su ogni pulsante "Copia codice" per aggiungere l'evento onclick
    pulsantiCopiaCodice.forEach(function(button) {
        // Ottieni il paragrafo padre del pulsante
		
		var action=button.textContent;
        var paragrafo = button.closest('.section');
		var capitolo = button.closest('.chapter-container');

		if (paragrafo){
			
			var paragrafoId = paragrafo.getAttribute('id');
			var capitoloId = capitolo.getAttribute('id');
			
			
			
			//console.log("NOME BOTTONE [",action,"] CAPITOLO [",capitoloId,"] PARAGRAFO [",paragrafoId,"]");

			switch (action) {
				case 'Copia codice':
				{
					var eventoAssociato = isEventoAssociato(button, 'click');
				//	console.log("------------Bottone [",action,"] - [",paragrafoId,"] - [",eventoAssociato,"]");
					if (!eventoAssociato) {
					//	console.log("--------------------...Sto associando evento al bottone [",action,"] - [",paragrafoId,"]");
						button.addEventListener('click', function() {
							copiaCode(paragrafoId);
						});
						button.disabled = false;
						//console.log("--------------------...Evento associato al bottone [",action,"] - [",paragrafoId,"]");
					}
				}break;
				case 'Modifica codice':
				{
					var eventoAssociato = isEventoAssociato(button, 'click');
					//console.log("------------Bottone [",action,"] - [",paragrafoId,"] - [",eventoAssociato,"]");
					if (paragrafoId.toLowerCase().startsWith("id")||paragrafoId.toLowerCase().startsWith("chapter1")){
					//	console.log("--------------------...Sto disabilitando evento al bottone [",action,"] - [",paragrafoId,"]");
						button.disabled = true;
						button.classList.add('disabled');
						//console.log("--------------------...Evento disabilitato al bottone [",action,"] - [",paragrafoId,"]");
					}
					else					
					{
						if (!eventoAssociato) {
							//console.log("--------------------...Sto associando evento al bottone [",action,"] - [",paragrafoId,"]");
							button.addEventListener('click', function() {
								modificaCode(paragrafoId);
							});
							button.disabled = false;
							//console.log("--------------------...Evento associato al bottone [",action,"] - [",paragrafoId,"]");
						}
						
					}
				}
					break;
				case 'Torna inizio':
				{
					if (!eventoAssociato) {
					//	console.log("--------------------...Sto associando evento al bottone [",action,"] - [",paragrafoId,"]");
						button.addEventListener('click', function() {
							tornaAllInizio();
						});
						button.disabled = false;
						//console.log("--------------------...Evento associato al bottone [",action,"] - [",paragrafoId,"]");
					}
				}
					break;					
				// Aggiungi altri casi se necessario
			}		
		}
		
		if (capitolo){
		
			var capitoloId = capitolo.getAttribute('id');
			
			//console.log("NOME BOTTONE [",action,"] CAPITOLO [",capitoloId,"]");

			switch (action) {
				case 'Aggiungi Paragrafo':
					{
						var eventoAssociato = isEventoAssociato(button, 'click');
						if (!eventoAssociato) {
							//console.log("--------------------Aggiungi Paragrafo",capitoloId);
							button.addEventListener('click', function() {
								aggiungiParagrafo(capitoloId);
							});
						}
					}			break;		
				case 'Elimina Paragrafo':
					{
						var eventoAssociato = isEventoAssociato(button, 'click');
						//console.log("------------Bottone [",action,"] - [",paragrafoId,"] - [",eventoAssociato,"]");
						if (!eventoAssociato)					
						{
							//console.log("--------------------...Sto associando evento al bottone [",action,"] - [",paragrafoId,"]");
							button.addEventListener('click', function() {
								eliminaParagrafo(capitoloId);
							});
							button.disabled = false;
							//console.log("--------------------...Associato evento al bottone [",action,"] - [",paragrafoId,"]");
						}
					}
					break;
				// Aggiungi altri casi se necessario
			}		
		}
		
    });
}

function isEventoAssociato(elemento, tipoEvento) {
    // Ottieni tutti gli eventi associati all'elemento
    var eventiElemento = elemento.getAttribute('on' + tipoEvento);

    // Restituisci true se l'evento è definito, altrimenti false
    return eventiElemento !== null && eventiElemento !== undefined;
}

function getNumCapitolo() {
	        // Calcola il numero di capitoli
        var numCapitoli = document.querySelectorAll('.chapter-container').length;
		
		var capitoli = document.querySelectorAll('.chapter-container')
        //console.log('Numero di capitoli:', numCapitoli);
		return numCapitoli;
        // Calcola il numero di paragrafi per ogni capitolo
        /* for (var i = 0; i < numCapitoli; i++) {
            var capitoloId = capitoli[i].getAttribute('id');
			console.log(capitoloId);
            var numParagrafi = document.querySelectorAll('#' + capitoloId + ' .section').length;
			var numParagrafi2 = document.querySelectorAll(capitoloId + ' .section').length;
            console.log('Numero di paragrafi per capitolo ' + i + ':', numParagrafi2+numParagrafi);
			
        } */
}	

function getNumParagrafo(capitoloId) {
	        // Calcola il numero di capitoli
            var numParagrafi = document.querySelectorAll('#' + capitoloId + ' .section').length;
			
			var capitolo = document.querySelector('#'+capitoloId);
			
			var titolo=capitolo.querySelector(' .chapter-title').textContent;
			
			
			console.log("TITOLO CAPITOLO ........... ==>  :", titolo);
			console.log("NUMERO PARAGRAFI ........... ==>  :", numParagrafi);
			
			
			var match = titolo.match(/CAP (.*?) -/);
			if(match)
			{	var testo = match[1];
				console.log("TITOLO CAPITOLO ........... ==>  :", titolo.textContent,"[",testo,"]");
			}

			
			return [numParagrafi+1,testo];

			
			
			
			
			
			
			
			
        
}	


//---------
