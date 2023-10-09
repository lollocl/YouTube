<script>
  import { browser } from "$app/environment";
  import { login, nome, cognome, email, username } from "$lib/data";
    import { video } from "$lib/videosList";
  import { onMount } from "svelte";
  let name = "";
  let lastname = "";
  let mail = ""; 
  let password = "";
  let nomeutente = "";

  //Controllo del nome
  function handleNomeInput(event) {
    const value = event.target.value.trim();
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      alert("Inserisci un nome valido.");
      name = "";
    } else {
      name = value;
    }
  }

  //Controllo del cognome
  function handleCognomeInput(event) {
    const value = event.target.value.trim();
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      alert("Inserisci un cognome valido.");
      lastname = "";
    } else {
      lastname = value;
    }
  }

  //Controllo della Mail
  function isValidEmail(event) {
    const value = event.target.value.trim();
    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

    if (!emailRegex.test(value)) {
      alert("Inserisci un indirizzo email valido.");
      mail = "";
    } else {
      mail = value;
    }
  }

  //Controllo dell'username
  function isValidPass(event) {
    const value = event.target.value.trim();
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (/^@.+dati$/.test(key)) {
        const item = localStorage.getItem(key);
        if (item) {
          const [nome, cognome, email, username] = item.split(",");
          if (username == value) {
            alert("Inserisci un username non utilizzato.");
            nomeutente = "";
            break;
          } else {
            nomeutente = value;
          }
        }
      }
    }
  }

  let VideoLikes = []
  let IscrizioniCanale = {}

  //funzione di login
  function handleLogin() {
    $nome = name;
    $cognome = lastname;
    $username = nomeutente;
    browser &&
      localStorage.setItem(
        `@${nomeutente}dati`,
        `${name},${lastname},${mail},${nomeutente}`
      );
    browser &&
      localStorage.setItem(
        `DatiAttuali`,
        `${name},${lastname},${mail},${nomeutente}`
      );
    $email = mail;

    if ($nome != "" && $cognome != "" && $username != "" && $email != "") {
      $login = true;
      login.subscribe(
        (value) => browser && localStorage.setItem("login", value.toString())
      );
      window.location.href = `/`;
    } else {
      $login = false;
      login.subscribe(
        (value) => browser && localStorage.setItem("login", value.toString())
      );
      alert("Devi prima inserire tutti i campi.");
    }
  }
</script>

<body>
  <div id="overlay">
    <main>
      <img src="/navbar/Google.png" alt="" />
      <h2>Inserisci i tuoi dati</h2>
      <form>
        <label>
          Nome
          <input
            type="text"
            bind:value={name}
            required
            on:keyup={handleNomeInput}
            title="Il nome deve contenere solo lettere"
          />
        </label>
        <label>
          Cognome
          <input
            type="text"
            bind:value={lastname}
            required
            on:keyup={handleCognomeInput}
            title="Il cognome deve contenere solo lettere"
          />
        </label>
        <label>
          Username
          <input
            type="text"
            bind:value={nomeutente}
            required
            on:blur={isValidPass}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            bind:value={mail}
            required
            on:blur={isValidEmail}
            title="L'email deve essere di Google"
          />
        </label>
        <label>
          Password
          <input type="password" bind:value={password} required />
        </label>
        <button on:click={() => handleLogin()} type="submit">Accedi</button>
      </form>
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
    padding: 20px;
    border: 1px solid rgba(65, 65, 65, 0.889);
    border-radius: 5px;
    background-color: transparent;
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

  form {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    color: white;
  }

  label {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
    color: white;
    padding: 10px 0 10px 0;
  }

  input {
    margin: 15px 0 0 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: white;
    background-color: transparent;
  }

  input:focus {
    outline: none;
    border-color: #4285f4;
  }

  button {
    width: 100%;
    text-decoration: none;
    padding: 10px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin: 30px 0 0 0;
  }
</style>
