Teoretiska resonemang

1. Motivera ditt val av databas:
   
   1. Jag valde att arbeta med PostgreSQL för att jag föredrar att arbeta med SQL-databaser som är robusta och där man direkt ser vad man håller på med.
   2. Vet ej varför jag föredrar SQL över NoSQL, tänker inte sitta och filosofera för att komma på (hitta på) anledningar till varför. 

3. Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen:

   1. Node.js: En open-source plattform som gör det möjligt att köra JavaScript kod på en server istället för exempelvis C# och Python, dvs, JavaScript-kod på både front- och backend.
   2. Express.js: Ett ramverk (regler och struktur) för att hantera API:er och och webbtjänster. Basically, endpoints och routing samt GET, POST, PUT, och DELETE requests.
   3. Sequeliza: Ett ORM (Object-Relational Mapping) bibliotek (samling av kod) för Node.js för att kunna användas med PostgreSQL. 
    Används för att definiera datamodellerna "User" och "Task" samt även hantera dess relationer till varandra därtill även CRUD-operationer (Create, Read, Update, Destroy) utan att behöva skriva direkt som SQL-kod.
   4. PostgreSQL: En SQL-databas som är open-source som kan hantera relationer mellan "Task" och "User". Mer utförligt så hanteras lagring och bearbetning av min applikations data, ergo - lagring av användare och uppgifter samt uppgifters koppling till användare. 
   5. TypeScript: Ett superset av JavaScript som tillämpar statisk typning, striktare error-handling och lägre risk för infallibel slumpmässig men fungerande kod. Detta eftersom man behöver definiera datatyper och objekt i förtid.
   6. Nodemon: Ett verktyg som automatiskt startar om ens applikation vid förändring av källkod. Man slipper helt enkelt att manuellt starta om ens server gång på för att granska ens ändringar.

5. Redogör översiktligt hur applikationen fungerar:

    1. Trullo är ett API som gör det möjligt för en att skapa och hantera olika uppgifter ("Task") i förhållning till användaren ("User"), dessa tasks har även olika statusar som indikerar på given framgång.
    2. De två ovanstående modellerna är båda kapabla till att användas från ett CRUD-perspektiv.
    3. En förfråga körs från API -> Sequelize som i sin tur hanterar databastabellerna för "Task" och "User". Exempel: POST-request för att skapa användare/uppgift och GET-request för att granska användare/uppgift. Sedan Sequelize -> PostgreSQL [som en tabell].
    4. För TypeScript, se punkt 5 inom sektion 2.
    5. Nodemon används för att automatisera omstart av ens server vid eventuell föränding av källkoden.
