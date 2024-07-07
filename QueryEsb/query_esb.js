// sezione creazione tabella iniziale
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
	
    // Se la tabella ha più di una riga, aggiungi il pulsante "Elimina"
    if (rowsCount > 1) {
        // Aggiungi il pulsante "Elimina" alla riga
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Elimina";
        deleteButton.setAttribute("onclick", "eliminaRiga(this)");
        var cell6 = row.insertCell(5);
        cell6.appendChild(deleteButton);
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


// sezione per creare ed eliminare paragrafi
//------------------------------------------------------------
function aggiungiParagrafo(chapterID) {
	
	
	//--------------------------------------------------------------------------
	var flagCapitolo;
		
 	if (chapterID==="-1-") {
        //console.log("chapterID è vuoto quindi devo creare un capitolo .");
		
		flagCapitolo="y";
        
	// Crea un nuovo elemento div per il capitolo
		var chapter = document.createElement("div");
		chapter.classList.add("chapter-container");

		// Genera un ID univoco per il capitolo basato sul titolo e su un timestamp
		var chapterID = "ID" + new Date().getTime();

		chapter.id = chapterID; // Imposta l'id del capitolo

		// Crea il titolo del capitolo
		var titoloElemento = document.createElement("div");
		titoloElemento.classList.add("chapter-title");
		
		var titoloCapitolo = prompt("Inserisci il titoloCapitolo:");
		if (!titoloCapitolo) {return;}
		
		titoloElemento.textContent = titoloCapitolo+"("+chapterID+")";

		// Aggiungi il titolo al nuovo capitolo
		chapter.appendChild(titoloElemento);

		// Aggiungi il nuovo capitolo al documento
		document.body.appendChild(chapter);

		// Aggiungi un gestore di eventi per aggiungere e rimuovere paragrafi al nuovo capitolo
		var aggiungiParagrafoButton = document.createElement("button");
		aggiungiParagrafoButton.textContent = "Aggiungi Paragrafo";
		aggiungiParagrafoButton.classList.add("chapter-button");
		aggiungiParagrafoButton.onclick = function() {
			aggiungiParagrafo(chapter.id);
		};
		
		var eliminaParagrafoButton = document.createElement("button");
		eliminaParagrafoButton.textContent = "Elimina Paragrafo";
		eliminaParagrafoButton.classList.add("chapter-button");
		eliminaParagrafoButton.onclick = function() {
			eliminaParagrafo(chapter.id);
		};

		// Aggiungi i bottoni al nuovo capitolo
		chapter.appendChild(aggiungiParagrafoButton);
		chapter.appendChild(eliminaParagrafoButton);		
		
		
		
    } else
	{
			flagCapitolo="n";
			var chapter = document.getElementById(chapterID);
	}


	//-------------------------------------------------------------------------

	//parte funzionante relativa al paragarfo


    //console.log("aggiungo paragrafo al capitolo",chapterID);
	
	// Trova il capitolo in cui aggiungere il paragrafo
    
	//var chapter = document.getElementById(chapterID); //commentato per gestione capitolo

	// INPUT 
		
    // Chiedi all'utente di inserire il titolo del paragrafo ed esci se valore vuoto
    var titoloParagrafo = prompt("Inserisci il titolo del paragrafo:");
    if (!titoloParagrafo) {        return;    }


	// Chiedi all'utente di inserire il codice della query PLSQL ed esci se valore vuoto
    var queryCode = prompt("Inserisci il codice della query PLSQL:");
    if (!queryCode) {        return;    }


	// Chiedi all'utente di inserire tabella ed esci se valore vuoto
	var sectionCsv = prompt("Inserisci la tabella in formato CSV (utilizza il tab come separatore):");
	if (!sectionCsv) return;


	// CREAZIONE OGGETTO PARAGRAFO

	var paragraph = {
				element: document.createElement("div"),
			id: "ID" + new Date().getTime(), // Genera un ID univoco per il paragrafo
			title: titoloParagrafo,
			queryCode: queryCode,
			sectionCsv: sectionCsv,
			build: function() {
				// Crea i div per le colonne
				var column1 = this.createColumn1();
				var column2 = this.createColumn2();
				// Aggiungi i div delle colonne al paragrafo
				//this.element.appendChild(document.createElement("hr")); // Aggiungi un paragrafo
				this.element.appendChild(column1);
				//this.element.appendChild(document.createElement("p")); // Aggiungi un paragrafo vuoto
				this.element.appendChild(column2);
				//this.element.appendChild(document.createElement("p")); // Aggiungi un paragrafo vuoto
				 
				this.element.classList.add("section");
			},
			createColumn1: function() {
				
				var elementHr = document.createElement("hr");
				
				var columnDiv = document.createElement("div");
				columnDiv.classList.add("section-column1");
				//columnDiv.appendChild(elementHr);

				var titleDiv = document.createElement("div");
				titleDiv.classList.add("section-title");
				titleDiv.textContent = this.title + " (" + this.id + ")";
				titleDiv.appendChild(elementHr);

				var codePre = document.createElement("pre");
				var code = document.createElement("code");
				code.classList.add("language-sql");
				code.textContent = this.queryCode;
				codePre.appendChild(code);

				columnDiv.appendChild(titleDiv);
				columnDiv.appendChild(codePre);
				return columnDiv;
			},
			createColumn2: function() {
				var columnDiv = document.createElement("div");
				columnDiv.classList.add("section-column2");

				var table = this.createTable();
				columnDiv.appendChild(table);

				return columnDiv;
			},
   			createTable: function() {
				var table = document.createElement("table");
				var rows = this.sectionCsv.trim().split("\n");
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
		} 
	};
    // Costruisci il paragrafo
    paragraph.build();

    // Imposta l'ID al paragrafo
    paragraph.element.id = paragraph.id;

	
    // Aggiungi il paragrafo al capitolo
    chapter.appendChild(paragraph.element);

	// AGGIORNA INDICE 
	
    // Aggiungi il paragrafo all'indice sotto il rispettivo capitolo
    
	if   (flagCapitolo==="n") 
	{
		//console.log("INDICE CAP NO AGGIUNGO PARAGRAFO!");
		var indexItem = document.querySelector('.index-item a[href="#' + chapterID + '"]');
		var paragraphsList = indexItem.nextElementSibling; // Trova la lista dei paragrafi
		var listItem = document.createElement("li");
		listItem.innerHTML = '<a href="#' + paragraph.id + '">'+titoloParagrafo+ '</a>';
		paragraphsList.appendChild(listItem);
		salvaStatoParagrafi() ;//1
		salvaStatoPagina();//2
 	}
	else {
		// Aggiorna gli indici aggiungendo un nuovo elemento all'elenco degli indici
		//console.log("INDICE CAP SI AGGIUNGO CAPITOLO E PARAGRAFO!");
		var indexList = document.querySelector('.index-list');
		var newItem = document.createElement("li");
		newItem.classList.add("index-item");
		newItem.innerHTML = '<a href="#' + chapterID + '">' + titoloCapitolo + '</a>';
		
		// Crea la struttura per la lista dei paragrafi
		var paragraphsList = document.createElement("ul");
		paragraphsList.classList.add("paragraphs-list");

		var listItem = document.createElement("li");
		listItem.innerHTML = '<a href="#' + paragraph.id + '">'+titoloParagrafo+ '</a>';
		// Aggiungi il nuovo elemento per il capitolo e la lista dei paragrafi alla lista degli indici
		paragraphsList.appendChild(listItem);
		newItem.appendChild(paragraphsList);
		indexList.appendChild(newItem);
		salvaStatoParagrafi() ; //2
		salvaStatoPagina(); //1
		
	}
 
	
	
	salvaStatoIndici() ;
	window.location.reload();
	 
}

function eliminaParagrafo() {
    // Chiedi all'utente di inserire l'ID del paragrafo da eliminare
    var paragraphID = prompt("Inserisci l'ID del paragrafo da eliminare:");
    if (!paragraphID) {
        return; // Se l'utente ha cliccato su "Annulla" o ha lasciato vuoto, esci dalla funzione
    }

    // Rimuovi il paragrafo dal capitolo
    var paragraph = document.getElementById(paragraphID);
    if (paragraph) {
        paragraph.remove();
    } else {
        console.log("Paragrafo non trovato!");
    }

    // Rimuovi il paragrafo dall'indice
    var indexItem = document.querySelector('.index-item a[href="#' + paragraphID + '"]');
    if (indexItem) {
        indexItem.parentElement.remove();
    }
	salvaStatoParagrafi() ;
	salvaStatoPagina();
	salvaStatoIndici() ;
	//window.location.reload();
}


// sezione per salvare e ripristinare la pagina
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

function salvaStatoParagrafi() { // TABELLA PARAGRAFI
    //console.log("Salvataggio paragrafi...");
    
	var chapters = document.querySelectorAll(".chapter-container");
    
	var paragrafiStato = [];
    
	chapters.forEach(function(chapter) {
        var paragrafi = chapter.querySelectorAll(".section");
        var paragrafiCapitolo = [];
    
		paragrafi.forEach(function(paragrafo) {
            //Cloniamo l'elemento per evitare problemi con i riferimenti
            //var clonedParagrafo = paragrafo.cloneNode(true);
            //paragrafiCapitolo.push(clonedParagrafo.innerHTML);
			
			var paragrafoId = paragrafo.getAttribute("id"); // Ottieni l'ID del paragrafo
            var paragrafoHTML = paragrafo.innerHTML; // Ottieni l'HTML del paragrafo
            var paragrafoData = { id: paragrafoId, html: paragrafoHTML }; // Crea un oggetto che contiene l'ID e l'HTML del paragrafo
            paragrafiCapitolo.push(paragrafoData); // Aggiungi l'oggetto all'array dei paragrafi
			
        });
			
        paragrafiStato.push(paragrafiCapitolo);
		//paragrafiStato.push(chapterData);
		
    });
    localStorage.setItem("paragrafiStato", JSON.stringify(paragrafiStato));
   // console.log("Salvataggio completato.");
	
}

 function ripristinaParagrafi() {
    //console.log("Ripristino paragrafi...");
    var paragrafiStato = localStorage.getItem("paragrafiStato");
    if (paragrafiStato) {
        var chapters = document.querySelectorAll(".chapter-container");
        var paragrafi = JSON.parse(paragrafiStato);
        chapters.forEach(function(chapter, index) {
            var paragrafiCapitolo = paragrafi[index];
            var paragrafiContainer = chapter.querySelector(".section");
            
			paragrafiContainer.innerHTML = '';
			
			// Aggiungi i paragrafi ripristinati
            paragrafiCapitolo.forEach(function(paragrafoData) {
                var paragrafoId = paragrafoData.id; // Ottieni l'ID del paragrafo
                var paragrafoHTML = paragrafoData.html; // Ottieni l'HTML del paragrafo
                
                // Crea l'elemento del paragrafo
                var paragrafo = document.createElement('div');
                paragrafo.innerHTML = paragrafoHTML;
                
                // Imposta l'ID del paragrafo
                paragrafo.id = paragrafoId;
                
                // Aggiungi il paragrafo al contenitore del capitolo
                paragrafiContainer.appendChild(paragrafo);
				//console.log("Titolo del paragrafo:", paragrafo.querySelector('.section-title').innerText, "id:",paragrafoId);
            });
			
        });
        //console.log("Ripristino completato.");
    } else {
        //console.log("Nessun dato salvato.");
    }
} 

function salvaStatoIndici() { // TABELLA INDICI
	//console.log("salvo indice");
    var indexContainer = document.querySelector(".index-container");
    var indexHTML = indexContainer.innerHTML;
    localStorage.setItem("indiciHTML", indexHTML);
}

function ripristinaIndici() {
	//console.log("Ripristino indice");
    var indexContainer = document.querySelector(".index-container");
    var indexHTML = localStorage.getItem("indiciHTML");
    if (indexHTML) {
        indexContainer.innerHTML = indexHTML;
    }
}

 window.onload = function() { // Chiamata alle funzioni di ripristino
    ripristinaTabella(); //funziona
    ripristinaParagrafi(); //funziona
	ripristinaStatoPagina();
    ripristinaIndici(); //funziona
}; 

/* document.addEventListener("DOMContentLoaded", function() {
            // La pagina è stata completamente caricata, ora possiamo eseguire il ripristino dei paragrafi
            ripristinaParagrafi();
        }); */
		


function salvaStatoPagina() {
    var statoCapitoli = [];

    // Ottieni tutti gli elementi con classe "chapter-container" che rappresentano i capitoli
    document.querySelectorAll('.chapter-container').forEach(function(capitolo) {
        var bottoni = {
            aggiungi: capitolo.querySelector('.aggiungiParagrafoButton') ? capitolo.querySelector('.aggiungiParagrafoButton').outerHTML : '',
            elimina: capitolo.querySelector('.eliminaParagrafoButton') ? capitolo.querySelector('.eliminaParagrafoButton').outerHTML : ''
        };
		console.log("CAPITOLI E BOTTONI SALVATI");

        var paragrafi = [];
        capitolo.querySelectorAll('.section').forEach(function(paragrafo) {
			
            var languageSqlElement = paragrafo.querySelector('.language-sql');
            var queryCode = languageSqlElement ? languageSqlElement.textContent : '';

            var column1Element = paragrafo.querySelector('.section-column1 pre code');
            var column1Html = column1Element ? column1Element.outerHTML : '';

            var sectionElement = paragrafo.querySelector('.section-column2 table');
            var sectionHtml = sectionElement ? sectionElement.outerHTML : '';

			
            paragrafi.push({
                id: paragrafo.id,
                titolo: paragrafo.querySelector('.section-title').textContent,
                queryCode: queryCode,
                sectionHtml: sectionHtml,
                column1Html: column1Html
            });
			
			console.log("PARAGRAFO:",paragrafo.id);
        });

        statoCapitoli.push({
            id: capitolo.id,
            titolo: capitolo.querySelector('.chapter-title').textContent,
            bottoni: bottoni,
            paragrafi: paragrafi
        });
    });

    localStorage.setItem('statoCapitoli', JSON.stringify(statoCapitoli));
}



function ripristinaStatoPagina() {
    var statoCapitoli = JSON.parse(localStorage.getItem('statoCapitoli')); // Recupera lo stato dei capitoli dal localStorage

    // Se non ci sono dati nel localStorage, esci dalla funzione
    if (!statoCapitoli) {
        return;
    }

    // Itera sui dati dei capitoli per ricostruirli nella pagina
    statoCapitoli.forEach(function(statoCapitolo) {
        var capitoloEsistente = document.getElementById(statoCapitolo.id);
		
		console.log("RIPRISTINO CAPITOLO:",statoCapitolo.id);

        // Verifica se il capitolo è già presente nella pagina
        if (!capitoloEsistente) {
            var nuovoCapitolo = document.createElement('div'); // Crea un nuovo elemento div per il capitolo
            nuovoCapitolo.classList.add('chapter-container');
            nuovoCapitolo.id = statoCapitolo.id; // Imposta l'ID del capitolo

            var titoloCapitolo = document.createElement('div'); // Crea un nuovo elemento div per il titolo del capitolo
            titoloCapitolo.classList.add('chapter-title');
            titoloCapitolo.textContent = statoCapitolo.titolo; // Imposta il titolo del capitolo

            // Aggiungi il titolo del capitolo al nuovo capitolo
            nuovoCapitolo.appendChild(titoloCapitolo);

            // Aggiungi il bottone "Aggiungi Paragrafo"
            var aggiungiParagrafoButton = document.createElement('button');
            aggiungiParagrafoButton.classList.add('chapter-button');
            aggiungiParagrafoButton.textContent = 'Aggiungi Paragrafo';
            aggiungiParagrafoButton.onclick = function() {
                aggiungiParagrafo(statoCapitolo.id);
            };
            nuovoCapitolo.appendChild(aggiungiParagrafoButton);

            // Aggiungi il bottone "Elimina Paragrafo"
            var eliminaParagrafoButton = document.createElement('button');
            eliminaParagrafoButton.classList.add('chapter-button');
            eliminaParagrafoButton.textContent = 'Elimina Paragrafo';
            eliminaParagrafoButton.onclick = function() {
                eliminaParagrafo(statoCapitolo.id);
            };
            nuovoCapitolo.appendChild(eliminaParagrafoButton);

            // Itera sui paragrafi del capitolo corrente per ricostruirli nella pagina
            statoCapitolo.paragrafi.forEach(function(statoParagrafo) {
                var paragrafoEsistente = document.getElementById("paragrafiStato");
				console.log("   |_RIPRISTINO PARAGRAFO NEW:",statoParagrafo.id);
                // Verifica se il paragrafo esiste già
                if (!paragrafoEsistente) {
                    
					//section-column1------------------------------
                    var titoloParagrafo = document.createElement('div'); // Crea un nuovo elemento div per il titolo del paragrafo
                    titoloParagrafo.classList.add('section-title');
                    titoloParagrafo.textContent = statoParagrafo.titolo; // Imposta il titolo del paragrafo
					
					
					var codiceQuery = document.createElement('pre'); // Crea un nuovo elemento pre per il codice della query PLSQL
                    codiceQuery.innerHTML = '<code class="language-sql">' + statoParagrafo.queryCode + '</code>';
				
					var sectionColumn1= document.createElement('div'); // Crea un nuovo elemento div per il paragrafo
                    sectionColumn1.classList.add('section-column1');
					
					
					sectionColumn1.appendChild(titoloParagrafo);
					sectionColumn1.appendChild(document.createElement('hr'));
					sectionColumn1.appendChild(codiceQuery);
					
					
					var nuovoParagrafo = document.createElement('div'); // Crea un nuovo elemento div per il paragrafo
                    nuovoParagrafo.classList.add('section');
                    nuovoParagrafo.id = statoParagrafo.id; // Imposta l'ID del paragrafo
								
					
					
					console.log("   |_nuovoParagrafo:",sectionColumn1.outerHTML);



					//section-column2------------------------------
					
                    var tabellaOutput = document.createElement('div'); // Crea un nuovo elemento div per la tabella di output del paragrafo
                    tabellaOutput.classList.add('section-column2');
                    tabellaOutput.innerHTML = statoParagrafo.sectionHtml; // Imposta la tabella di output del paragrafo
					console.log("   |_nuovoParagrafo:",tabellaOutput.outerHTML);

                    // Aggiungi il titolo del paragrafo, il codice della query e la tabella di output al nuovo paragrafo
					
					//nuovoParagrafo.appendChild(sectionColumn);
                    
					
                    nuovoParagrafo.appendChild(sectionColumn1);
					nuovoParagrafo.appendChild(document.createElement('p'));
                    nuovoParagrafo.appendChild(tabellaOutput);
					nuovoParagrafo.appendChild(document.createElement('p'));

                    // Aggiungi il nuovo paragrafo al nuovo capitolo
                    nuovoCapitolo.appendChild(nuovoParagrafo);
                }
            });

            // Aggiungi il nuovo capitolo al corpo del documento
            document.body.appendChild(nuovoCapitolo);
        }
		else 
		{
			ripristinaParagrafi(statoCapitolo.id);
			;
			}
    });
}
