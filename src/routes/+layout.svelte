<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import { login, nome, cognome, email, videoclick, val, menuOpen, searchQuery, inputFocused, searchList, username, remove, like, likedList, users, selectedIndex } from "$lib/data";
  import { video } from "$lib/videosList";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import Menuvideo from "$lib/components/video/Menuvideo.svelte";

  let icons = {
    menu: "mi mi-menu",
    create: "/navbar/Create.png",
    notif: "mi mi-notification",
    vocal: "/navbar/Vocal.png",
    logo: "/navbar/yt.png",
  };

  let search = "mi mi-search";
  let searchf = "icon mi mi-search";

  let icom = [
    { src:"/navigation/Home.png", value:"Home" },
    { src:"/navigation/Iscrizioni.png", value:"Iscrizioni" },
    { src:"/navigation/Raccolta.png", value:"Raccolta" },
    { src:"/navigation/Like.png", value:"Like" },
    { src:"/navigation/Playlist.png", value:"Playlist" },
    { src:"/navbar/user.png", value:"Accedi" },
  ]
  
  let clickeds = [
    { src:"/navigation/Home_clicked.png", value:"Home" },
    { src:"/navigation/Iscrizioni_clicked.png", value:"Iscrizioni" },
    { src:"/navigation/Raccolta_clicked.png", value:"Raccolta" },
    { src:"/navigation/Like_clicked.png", value:"Like" },
    { src:"/navigation/Playlist_clicked.png", value:"Playlist" },
  ]  

  let pattern = /video/;
  export let data

  //Caricamento di tutti i dati dal local storage
  onMount(() => {
    $selectedIndex = $val;
    if (localStorage.length < 2) {
      $login = false;
        login.subscribe((value) => 
          browser && localStorage.setItem("login", value.toString())
      );
      $remove = false;
        login.subscribe((value) => 
          browser && localStorage.setItem("remove", value.toString())
      );
    }
    else {
      $login = JSON.parse(localStorage.getItem('login'));
      const datiMemorizzati = localStorage.getItem("DatiAttuali");
      if (datiMemorizzati != null)
        [$nome, $cognome, $email, $username] = datiMemorizzati.split(',');

      if (localStorage.getItem(`channels`)) {
        $video.forEach(item => {
          if (localStorage.getItem("channels")?.includes(item?.nomecanale))
            item.iscriviti = true
        })
      }
        
      if (localStorage.getItem(`like`)) {
      const likedVideoIds = (localStorage.getItem(`like`)?.split(',') || []).map(Number);
      let app = likedVideoIds.length
      for (let i=0; i<likedVideoIds.length; i++) {
        $like.pop()
      }
      for (let i=0; i<app; i++) {
        $like.push($video.find(item => likedVideoIds[i] == item.id))
      }
      $likedList = likedVideoIds;
    }
    }
    if (pattern.test($page.url.pathname)) {
      $videoclick = true;      
    }
    else {
      $videoclick = false;
    }

    const { utenti } = data;
    $users = utenti

    $video.forEach(item => {
      if(item.id == 1)
        item.user = $users[0].username
      else
        item.user = $users[1].username
    })
  });

  function handleButtonClick(index) {
    $selectedIndex = index;
  }

  function show() {
    $menuOpen=!$menuOpen;
  }

  const subscribedChannelsSet = new Set();

  function exit() {
    $video.forEach(item => {
    if (item.iscriviti == true) {
      subscribedChannelsSet.add(item.nomecanale);
      }
    });

    const subscribedChannels = Array.from(subscribedChannelsSet);
    const savestring = JSON.stringify({
      likedVideoIds: $likedList,
      subscribedChannels: subscribedChannels
    });

    localStorage.setItem( $username, savestring);
    $login = false;
      login.subscribe((value) => 
      browser && localStorage.setItem("login", value.toString())
    );
    $video.forEach(videoItem => {
        localStorage.removeItem(videoItem.titolovideo)
    });
    $video.forEach(videoItem => {
        localStorage.removeItem(videoItem.nomecanale)
    });
    $nome = ""
    $cognome = ""
    $email = ""
    $username = ""
    localStorage.removeItem("DatiAttuali")
    localStorage.removeItem("channels")
    localStorage.removeItem("like")
    window.location.href = "/"
  }

  //modale
  let showModal = false;

  function clickOutside(node) {
	
    window.addEventListener('click', handleClick);
    
    
    function handleClick(e){   
          if (!node.contains(e.target)){
              node.dispatchEvent(new CustomEvent('outsideclick'))
          }
      }

    return {
      destroy() {
        window.removeEventListener('click', handleClick)
      }
    };
  } 

  let iniziale = '';
  let colore = '';

  function letter() {
    iniziale = ($username).charAt(0);
    colore = getLetterColor(iniziale);
  }


  function getLetterColor(letter) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const colorPalette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#000080'];

    const index = alphabet.indexOf(letter.toLowerCase());
    return colorPalette[index % colorPalette.length];
  }

  //Funzione per cercare un video
  function updateSearchQuery(event) {
    $searchQuery = event.target.value;
    const sanitizedQuery = $searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(sanitizedQuery, 'i');
    $searchList = $video.filter(videoItem => regex.test(videoItem.titolovideo));
    let idlist = $searchList.map(item => item.id);
    browser && localStorage.setItem("searchList", idlist.join(','))
    browser && localStorage.setItem("searchQuery", $searchQuery)
  }


  function showIcon() {
    $inputFocused = true;
  }

  function hideIcon() {
    $inputFocused = false;
  }

  function accedi() {
    window.location.href = `/account`
  }

</script>

<main>
    <nav class="navbar">
        <div class="left-items">
          <button on:click={() => show()}><i class={icons.menu}></i></button>
          <a href="/" style="text-decoration: none;"><img src={icons.logo} alt="" id="logo"></a>
        </div>
        <div class="center-items">
          <div class="container">
            <input type="text" placeholder="Cerca" bind:value={$searchQuery} on:input={updateSearchQuery} on:focus={showIcon} on:blur={hideIcon}>
            {#if $inputFocused}
              <i class={searchf}></i>
            {/if}
            <a href="/search" style="text-decoration: none;"><button id="search"><i class={search}></i></button></a>
          </div>
          <button><img id="v" src={icons.vocal} alt=""></button>
        </div>
        <div class="right-items">
        {#if $login}
        <button><img id="cr" src={icons.create} alt=""></button>
        <button><i class={icons.notif}></i></button>

        {#if showModal}
        <button style='--colore:{colore};' id="account" use:clickOutside on:outsideclick={() => showModal = false}>{iniziale}</button>
        <div class="modal-overlay">
          <div class="modal">
              <ul>
                <div class="header">
                  <span style='--colore:{colore};' id="iniziale">{iniziale}</span>
                  <div class="wrapper">
                    <p>{$nome} {$cognome}</p>
                    <p>{$email}</p>
                  </div>
                </div>
                <hr>
                <a href="/profile" style="text-decoration: none;"><button id="b-modal"><img src="/navbar/Canale.png" alt=""><span>Il tuo profilo</span></button></a>
                <button id="b-modal" on:click={exit}><img src="/navbar/Esci.png" alt=""><span>Esci</span></button>
              </ul>
          </div>
        </div>
        {:else}
        <span style="display: none;">{letter()}</span>
        <button style='--colore:{colore};' id="account"  on:click|stopPropagation={(event) => showModal = true}>{iniziale}</button>
        {/if}
        {:else}
          <button id="nolog" on:click={accedi}><img src={icom[5].src} alt=""><span>{icom[5].value}</span></button>
        {/if}
      </div>
    </nav>
      <!-- MENU -->
    {#if $videoclick}
        <Menuvideo
        show = {show}
        icom = {icom}
        icons = {icons}/>
      <slot />
    {:else}
    <div class="main-content">
      <div class="menu">
        {#if $menuOpen}
        <div class="menu-visible">
            <ul>
                {#if $login}
                  <a href="/" style="text-decoration: none;"><button class:selected={$selectedIndex === 0} on:click={() => handleButtonClick(0)}>
                      <img src={$selectedIndex === 0 ? clickeds[0].src : icom[0].src} alt=""><span>{icom[0].value}</span>
                  </button></a>
                  <a href="/iscrizioni" style="text-decoration: none;"><button class:selected={$selectedIndex === 1} on:click={() => handleButtonClick(1)}>
                      <img src={$selectedIndex === 1 ? clickeds[1].src : icom[1].src} alt=""><span>{icom[1].value}</span>
                  </button></a>
                  <hr>
                  <button class:selected={$selectedIndex === 2} on:click={() => handleButtonClick(2)}>
                      <img src={$selectedIndex === 2 ? clickeds[2].src : icom[2].src} alt=""><span>{icom[2].value}</span>
                  </button>
                  <a href="/like" style="text-decoration: none;"><button class:selected={$selectedIndex === 3} on:click={() => handleButtonClick(3)}>
                      <img src={$selectedIndex === 3 ? clickeds[3].src : icom[3].src} alt=""><span>{icom[3].value}</span>
                  </button></a>
                  <button class:selected={$selectedIndex === 4} on:click={() => handleButtonClick(4)}>
                      <img src={$selectedIndex === 4 ? clickeds[4].src : icom[4].src} alt=""><span>{icom[4].value}</span>
                  </button>
                  <hr>
                {:else}
                  <a href="/" style="text-decoration: none;"><button class:selected={$selectedIndex === 0} on:click={() => handleButtonClick(0)}>
                      <img src={$selectedIndex === 0 ? clickeds[0].src : icom[0].src} alt=""><span>{icom[0].value}</span>
                  </button></a>
                  <a href="/iscrizioni" style="text-decoration: none;"><button class:selected={$selectedIndex === 1} on:click={() => handleButtonClick(1)}>
                      <img src={$selectedIndex === 1 ? clickeds[1].src : icom[1].src} alt=""><span>{icom[1].value}</span>
                  </button></a>
                  <hr>
                  <button class:selected={$selectedIndex === 2} on:click={() => handleButtonClick(2)}>
                      <img src={$selectedIndex === 2 ? clickeds[2].src : icom[2].src} alt=""><span>{icom[2].value}</span>
                  </button>
                  <hr>
                  <div id="descr-nolog">Effettua l'accesso per mettere Mi piace ai video, commentare e iscriverti ai canali.</div>
                  <button id="nolog2" on:click={accedi}><img src={icom[5].src} alt=""><span>{icom[5].value}</span></button>
                  <hr>
                {/if}
            </ul>
        </div>
        {:else}
        <div class="menu-reduced">
          <ul>
              <a href="/" style="text-decoration: none;"><button class:selected={$selectedIndex === 0} on:click={() => handleButtonClick(0)}>
                  <img src={$selectedIndex === 0 ? clickeds[0].src : icom[0].src} alt="">
                  <span>{icom[0].value}</span>
              </button></a>
              <a href="/iscrizioni" style="text-decoration: none;"><button class:selected={$selectedIndex === 1} on:click={() => handleButtonClick(1)}>
                  <img src={$selectedIndex === 1 ? clickeds[1].src : icom[1].src} alt="">
                  <span>{icom[1].value}</span>
              </button></a>
              <button class:selected={$selectedIndex === 2} on:click={() => handleButtonClick(2)}>
                  <img src={$selectedIndex === 2 ? clickeds[2].src : icom[2].src} alt="">
                  <span>{icom[2].value}</span>
              </button>
          </ul>
        </div>
        {/if}
      </div>
        <div class="video-list">
          <slot />
        </div>
    </div>
    {/if}
</main>

<style>

  .navbar {
    background-color: rgb(14, 13, 13);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 997;
  }

  .navbar button {
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin: 0 10px 0 10px;
    padding: 0;
    background-color: transparent;
  }

  .navbar button i {
    background-color: transparent;
    color: white;
    font-size: 35px;
  }

  #logo {
    max-width: 150px;
    max-height: 120px;
    padding: 0 0 5% 10px;
  }

  .left-items {
    display: flex;
    align-items: center;
    margin: 10px 0 0 0;
  }

  .center-items,
  .right-items {
    display: flex;
    align-items: center;
    margin: 0 20px 0 0;
  }

  .center-items {
    flex: 1;
    justify-content: center;
  }

  .navbar button:hover {
    background-color: rgba(65, 65, 65, 0.458);
    border-radius: 100%;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }

  #cr {
    width: 35px;
    background-color: transparent;
    padding: 0 0 5px 0;
  }

  #v {
    width: 20px;
    background-color: rgba(65, 65, 65, 0.329);
    border-radius: 100%;
    padding: 11px 15px 11px 15px;
  }

  button#account {
    background-color: var(--colore);
    width: 50px;
    height: 50px;
    color: white;
    font-size: 20px;
    border-radius: 100%;
    margin: 0 10px 10px 10px;
  }

  button#nolog {
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: white;
    background-color: transparent;
    border-radius: 25px;
    width: 130px;
    height: 45px;
    border: 1px solid rgba(65, 65, 65, 0.458);
  }

  button#nolog img {
    width: 30px;
    height: 30px;
    background-color: transparent;
    padding: 2px 10px 0 0;
  }

  button#nolog span {
    font-size: 16px;
    font-weight: bold;
    background-color: transparent;
    color: #3da4fc;
  }

  button#nolog:hover {
    background-color: #3da3fc41;
  }

  /* searchbox */
  .container {
    display: flex;
    align-items: center;
    padding: 0;
    position: relative;
    min-width: 750px;
    justify-content: flex-end;
  }

  .container input {
    flex: 1;
    border: 1px solid rgba(65, 65, 65, 0.889);
    border-radius: 20px 0 0 20px;
    padding: 11px;
    color: white;
    font-size: 15px;
    transition: transform 0s ease;
    transform-origin: right;
    max-width: 600px;
    box-sizing: border-box;
    background-color: transparent;
  }

  .container input::placeholder {
    pointer-events: none;
    position: absolute;
  }

  .container input:focus {
    outline: none;
    border-color: #007bff;
    padding-left: 50px;
    transform: scaleX(1.07);
  }

  #search {
    background-color: rgba(65, 65, 65, 0.458);
    border: 1px solid rgba(65, 65, 65, 0.889);
    border-radius: 0 40px 40px 0;
    border-left: none;
    cursor: pointer;
    height: 42px;
    width: 64px;
    margin: 0;
  }

  #search:hover {
    cursor: pointer;
  }

  .container button i {
    background-color: transparent;
    color: white;
    font-size: 25px;
    border-radius: 20px;
  }

  .container i.icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 20px;
    left: 9%;
    background-color: transparent;
  }

  .main-content {
    display: flex;
  }

  /* menu */
  .menu {
    margin: 55px 0 0 0;
    padding: 0;
  }

  .menu hr {
    width: 200px;
    size: 1px;
    margin: 10px 0 0 0;
  }

  ul {
    padding: 0;
  }

  /* menu visibile*/
  .menu-visible {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 20px 15px 0 10px;
    overflow-y: auto;
    background-color: transparent;
  }

  .menu-visible button {
    width: 200px;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 10px 50px 10px 10px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .menu-visible span {
    background-color: transparent;
  }

  .menu-visible button img {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    background-color: transparent;
    padding: 0 20px 0 0;
  }

  .menu-visible button:hover {
    background-color: rgba(65, 65, 65, 0.458);
    cursor: pointer;
    border-radius: 10px;
  }


  .menu-visible button.selected {
    background-color: rgba(65, 65, 65, 0.458);
    border-radius: 10px;
  }

  .menu-visible button.selected:hover {
    background-color: rgba(65, 65, 65, 0.889);
  }

  /* menu ridotto */
  .menu-reduced {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 12px 25px 0 3px;
  }

  .menu-reduced button {
    width: 60px;
    height: 75px;
    display: flex;
    flex-direction: column;
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  .menu-reduced button img {
    width: 24px;
    height: 24px;
    background-color: transparent;
    margin: 0;
  }

  .menu-reduced button:hover {
    background-color: rgba(65, 65, 65, 0.458);
    cursor: pointer;
    border-radius: 10px;
  }

  .menu-reduced button span {
    font-size: 10px;
    background-color: transparent;
    padding: 10px 0 0 0;
  }

  .menu-visible #descr-nolog {
    color: white;
    font-size: 15px;
    width: 180px;
    height: auto;
    padding: 15px 0 15px 10px;
  }

  .menu-visible button#nolog2 {
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: white;
    background-color: transparent;
    border-radius: 25px;
    width: 100px;
    height: 35px;
    border: 1px solid rgba(65, 65, 65, 0.458);
    margin: 0 0 0 15px;
    padding: 0;
  }

  button#nolog2 img {
    width: 20px;
    height: 20px;
    background-color: transparent;
    padding: 0 1px 0 0;
  }

  button#nolog2 span {
    font-size: 14px;
    font-weight: bold;
    background-color: transparent;
    color: #3da4fc;
  }

  button#nolog2:hover {
    background-color: #3da3fc41;
  }

  .video-list {
    flex: 1;
    margin: 70px 0 0 0;
  }

  /* modale */
  .modal-overlay {
    position: fixed;
    position: absolute;
    top: 65px;
    right: 40px;
    background-color: transparent;
    z-index: 9999;
  }

  .modal {
    background-color: rgb(48, 48, 48);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    min-width: 340px;
  }

  .modal #b-modal {
    width: 100%;
    display: flex;
    align-items: center;
    background: none;
    padding: 15px 0 10px 10px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    background-color: transparent;
    margin: 0;
    border-radius: 0;
  }

  .modal #b-modal:hover {
    background-color: rgb(69, 68, 68);
    cursor: pointer;
  }

  .modal #b-modal img {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    background-color: transparent;
    padding: 0 20px 0 0;
  }

  .modal span {
    background-color: transparent;
  }

  .header {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    margin: 0;
    border: 0;
    position: relative;
    padding: 16px 0 20px 16px;
  }

  .header p {
    background-color: transparent;
    color: white;
    font-size: 16px;
    margin: 0;
  }

  .header #iniziale {
    display: inline-block;
    font-size: 20px;
    background-color: var(--colore);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: white;
  }

  .header .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
    margin: 0 0 0 5%;
  }

</style>