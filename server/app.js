const express = require('express');
const app = express();
const fs = require('fs/promises');
const PORT = 5001;

app 
  .use(express.json())
  .use(express.urlencoded({ extended: false })) 
  .use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*'); 
    next();
  });

app.get('/players', async (req, res) => {
  try { 
    const players = await fs.readFile('./players.json'); 
    res.send(JSON.parse(players));
  } catch (error) { 
    res.status(500).send({ error });
  }
});

/* Uppgift 2 C, hela app.post*/

/* 
Lyssnar och tar emot data till backend. Svaret från backend är res. Svaret kommer från players.json
När ett request är gjort, kommer servern exekvera funktionen.
Funktionen läser först request-bodyn och sparar den i variablen 'player'.
Sedan läser den innehållen av filen 'players.json' och sparar den i variabeln listBuffer.
För att kunna behandla listan av player i filen som JavaScript-objekt, behövs JSON.parse. 
Vi parsar alltså innehållet av listBuffer och sparar det resulterande objektet i variabeln 'currentPlayers'.
Sedan bestämmer den nuvarande maximum id av currentPlayers genom att använda reduce-metoden på currentPlayers och spara värdet i variabeln maxId.
Om currentPlayers är tom eller odefinierad kommer maxPlayerId att förbli 1.
Om currentPlayers finns och har en längd som är större än 0, ställer den in maxPlayerId som det högsta id-värdet bland alla objekt i currentPlayers.
Sedan lägger den till det nya objektet till arrayen och skriver den resulterande arrayen till players.json.
Slutligen skickar den det nya objektet tillbaka i responsen.
Om ett error förekommer någon gång under processsen, kommer servern skicka ett respons med statuskoden 500 (Internal Server Error) och errormeddelandet.
*/
app.post('/players', async (req, res) => {
  try { 
    const player = req.body; 
    const listBuffer = await fs.readFile('./players.json');
    const currentPlayers = JSON.parse(listBuffer);
    let maxPlayerId = 1;
    if (currentPlayers && currentPlayers.length > 0) {  
      maxPlayerId = currentPlayers.reduce( 
        (maxId, currentElement) =>  
          currentElement.id > maxId ? currentElement.id : maxId,
          maxPlayerId
      );
    }
    const newPlayer = { id: maxPlayerId + 1, ...player };
    const newList = currentPlayers ? [...currentPlayers, newPlayer] : [newPlayer];
    await fs.writeFile('./players.json', JSON.stringify(newList));
    res.send(newPlayer);
  } catch (error) { 
    res.status(500).send({ error: error.stack });
  }
});

app.delete('/players/:id', async (req, res) => {
  console.log(req);
  try { 
    const id = req.params.id; 
    const listBuffer = await fs.readFile('./players.json');
    const currentPlayers = JSON.parse(listBuffer);
    if (currentPlayers.length > 0) { 
      await fs.writeFile(
        './players.json',
        JSON.stringify(currentPlayers.filter((player) => player.id != id))
      ); 
      res.send({ message: `Spelare med id ${id} togs bort` });
    } else {
      res.status(404).send({ error: 'Ingen spelare att ta bort' });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.listen(PORT, () => console.log('Server running on http://localhost:5001'));