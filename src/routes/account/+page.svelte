<script>
    import { browser } from "$app/environment";
    import { accounts, nome, cognome, email, username, remove } from "$lib/data";
    import { video } from "$lib/videosList";
    import { onMount } from "svelte";

    //Itera sulle chiavi del local storage e in base al macth carica gli account vecchi
    onMount(() => {
    const keys = Object.keys(localStorage);
    $remove = JSON.parse(localStorage.getItem("remove"));    
    for (const key of keys) {
        if (/^@.+dati$/.test(key)) {
            const item = localStorage.getItem(key);
            if (item) {
                const [nome, cognome, email, username] = item.split(',');
                $accounts.push({ nome: nome, cognome: cognome, email: email, username: username });
            }
        }
    }
    });

    //Iniziale username
    function letter(parola) {
    let iniziale = (parola).charAt(0);
        return iniziale
    }

    //Colore sfondo lettera
    function getLetterColor(parola) {
        let letter = (parola).charAt(0);
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const colorPalette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#000080'];

        const index = alphabet.indexOf(letter.toLowerCase());
        return colorPalette[index % colorPalette.length];
    }

    //Funzione che seleziona l'account
    function selectAccount(u, n, c, e) {

        $nome = n
        $cognome = c
        $username = u
        $email = e
        localStorage.setItem(`DatiAttuali`, `${n},${c},${e},${u}`);

        const DataString = localStorage.getItem(`${u}`);
        const Data = JSON.parse(DataString);
        localStorage.setItem("like", Data.likedVideoIds);
        localStorage.setItem("channels", Data.subscribedChannels);
        localStorage.setItem("login" , "true");

        window.location.href = `/`
    }

    function HandleFalseRemove() {
        localStorage.setItem("remove", "false")
        window.location.reload()
    }

    function HandleTrueRemove() {
        localStorage.setItem("remove", "true")
        window.location.reload()
    }

    function rimuovi(user) {
        localStorage.removeItem(`@${user}dati`)
        localStorage.removeItem(user)
        window.location.reload()
    }
</script>
  
<body>
    <div id="overlay">
        <main>
            <img src="./navbar/Google.png" alt="">
            {#if $remove} 
                <h2>Rimuovi un account</h2>
                    {#each $accounts as account (account.username)}
                        <button class="account-row1" on:click={() => rimuovi(account.username)}>
                            <div class="header">
                                <span style='--colore:{getLetterColor(account.nome)};' id="iniziale">{letter(account.nome)}</span>
                                <div class="wrapper">
                                    <p id="nome">{account.nome} {account.cognome}</p>
                                    <p id="mail">{account.email}</p>
                                <img id="remove" src="/navigation/remove_icon.png" alt="">
                                </div>
                            </div>
                        </button>
                        <hr>
                    {/each}
                    <button class="account-row2">
                        <img src="/navigation/crea_account.png" alt=""><span>Utilizza un altro account</span>
                    </button>
                    <hr>
                    <button id="fine" on:click={() => HandleFalseRemove()}>Fine</button>
            {:else}
                <h2>Scegli un account</h2>
                    {#each $accounts as account (account.username)}
                        <button class="account-row1" on:click={() => selectAccount(account.username, account.nome, account.cognome, account.email)}>
                            <div class="header">
                                <span style='--colore:{getLetterColor(account.username)};' id="iniziale">{letter(account.username)}</span>
                                <div class="wrapper">
                                <p id="nome">{account.nome} {account.cognome}</p>
                                <p id="mail">{account.email}</p>
                                </div>
                            </div>
                        </button>
                        <hr>
                {/each}
                    <a href="/account/auth" style="text-decoration: none;"><button class="account-row2">
                        <img src="/navigation/crea_account.png" alt=""><span>Utilizza un altro account</span>
                    </button></a>
                    <hr>
                    <button class="account-row2" on:click={() => HandleTrueRemove()}>
                        <img src="/navigation/elimina_account.png" alt=""><span>Rimuovi un account</span>
                    </button>
                    <hr>
            {/if}
            </main>
    </div>
</body>
    
<style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: rgb(24, 26, 27);
        z-index: 999;
    }

    #overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(24, 26, 27);
        z-index: 999;
    }

    main {
        height: auto;
        width: 400px;
        margin: 0 auto;
        padding: 0;
        padding-bottom: 50px;
        padding-top: 30px;
        border: 1px solid rgba(65, 65, 65, 0.889);
        border-radius: 5px;
        background-color: transparent;
        z-index: 1000;
    }

    

    img {
        width: 170px;
        height: 60px;
        background-color: transparent;
        display: block;
        margin: auto;
    }

    h2 {
        text-align: center;
        margin: 15px 0 20px 0;
        background-color: transparent;
        color: white;
    }

    .account-row2 {
        width: 100%;
        border: none;
        color: rgb(169, 162, 151);
        background-color: transparent;
        display: flex;
        justify-content: flex-start;
        padding: 20px;
        padding-left: 10%;
        font-size: 15px;
        font-weight: bold;
        margin: 0;
    }

    .header {
        display: flex;
        align-items: center;
    }

    #iniziale {
        display: inline-block;
        font-size: 18px;
        background-color: var(--colore);
        border-radius: 50%;
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: white;
    }

    .wrapper {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .account-row1 {
        width: 100%;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: flex-start;
        padding: 20px;
        padding-left: 10%;
        margin: 0;
        position: relative;
    }

    .account-row1 #remove {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 10%;
    }

    #nome {
        color: rgb(169, 162, 151);
        font-weight: bold;
        margin: 0;
        font-size: 15px;
    }

    #mail {
        color: rgb(169, 162, 151);
        margin: 0;
        font-size: 15px;
    }

    .account-row1:hover {
        background-color: rgba(169, 162, 151, 0.08);
        cursor: pointer;
    }

    .account-row2:hover {
        background-color: rgba(169, 162, 151, 0.08);
        cursor: pointer;
    }

    .account-row2 img {
        height: 20px;
        width: 22px;
        margin-right: 10px;
        margin-left: 0;
    }

    hr {
        width: 80%;
        margin-top: 0;
        margin-bottom: 0;
        border: none;
        border-bottom: solid 0.5px rgb(169, 162, 151);
    }

    #fine {
        font-size: 17px;
        font-weight: bold;
        background-color: transparent;
        color: #3da4fc;
        border: none;
        border-radius: 10px;
        position: relative;
        margin: 10% 0 0 30px;
        padding: 10px;
    }

    #fine:hover {
        background-color: #3da3fc13;
        cursor: pointer;
    }
</style>