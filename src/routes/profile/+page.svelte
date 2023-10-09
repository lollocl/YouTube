<script>
    import { cognome, nome, username } from "$lib/data";

    let colore = '';

    function letter() {
        let iniziale = ($nome).charAt(0);
        colore = getLetterColor(iniziale);
        return iniziale
    }

    function getLetterColor(letter) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const colorPalette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#000080'];

        const index = alphabet.indexOf(letter.toLowerCase());
        return colorPalette[index % colorPalette.length];
    }

</script>

<main>
    <div class="header">
        <span style='--colore:{getLetterColor($username.charAt(0))};' id="iniziale">{letter()}</span>
        <div class="wrapper">
        <p id="nome">{$nome} {$cognome}</p>
        <p id="user">@{$username}</p>
        </div>
    </div>
</main>

<style>

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
    }

    .header {
        display: flex;
        width: 60%;
        margin-top: 2%;
    }

    #iniziale {
        display: inline-block;
        font-size: 80px;
        background-color: var(--colore);
        border-radius: 50%;
        width: 128px;
        height: 128px;
        text-align: center;
        line-height: 128px;
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

    #nome {
        color: white;
        margin: 0;
        font-size: 30px;
        margin-top: 10px;
    }

    #user {
        color: rgb(169, 162, 151);
        margin: 0;
        font-size: 20px;
    }
</style>