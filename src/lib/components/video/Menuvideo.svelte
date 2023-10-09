<script>
    import { menuOpen, selectedIndex } from "$lib/data";

    export let show;
    export let icons;
    export let icom;

</script>

<div class:overlay="{$menuOpen ? '' : 'overlay'}">
  <div class="menu-container">

    <div class="{$menuOpen ? '' : 'open-menu'}">
    <div class="nav-menu">
      <div class="left-items">
        <button on:click={() => show()}><i class={icons.menu}></i></button>
        <a href="/" style="text-decoration: none;"><img src={icons.logo} alt="" id="logo"></a>
      </div>

      <div class="menu-video">
        <ul>
            <a href="/" style="text-decoration: none;"><button>
                <img src={icom[0].src} alt=""><span>{icom[0].value}</span>
            </button></a>
            <a href="/iscrizioni" style="text-decoration: none;"><button on:click={() => {$selectedIndex=1}}>
                <img src={icom[1].src} alt=""><span>{icom[1].value}</span>
            </button></a>
            <hr>
            <button>
                <img src={icom[2].src} alt=""><span>{icom[2].value}</span>
            </button>
            <a href="/like" style="text-decoration: none;"><button on:click={() => {$selectedIndex=3}}>
                <img src={icom[3].src} alt=""><span>{icom[3].value}</span>
            </button></a>
            <button>
                <img src={icom[4].src} alt=""><span>{icom[4].value}</span>
            </button>
            <hr>
        </ul>
      </div>

    </div>
    </div>
  </div>
</div>


<style>

    .open-menu .nav-menu {
        transform: translateX(-0vw);
    }

    div.nav-menu {
        background-color: rgb(14, 13, 13);
        position: absolute;
        transform: translateX(-100vw);
        transform-origin: (0, 0);
        width: 250px;
        height: 340px;
        transition: 0.3s ease-in-out;
    }

  .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(14, 13, 13, 0.43);
        z-index: 998;
        border: none;
        overflow-y: none;
        
    }

    #logo {
        max-width: 150px;
        max-height: 120px;
        padding: 0 0 5% 10px;
    }

    .left-items {
        padding: 20px;
        background-color: rgb(14, 13, 13);
        display: flex;
        align-items: center;
        margin: 0;
        width: 210px;
    }

    .left-items button {
        border: none;
        cursor: pointer;
        width: 50px;
        height: 50px;
        margin: 0 10px 0 10px;
        padding: 0;
        background-color: transparent;
    }

    .left-items button i {
        background-color: transparent;
        color: white;
        font-size: 35px;
    }

    .menu-video {
        background-color: rgb(14, 13, 13);
        position: fixed;
        top: 60px;
        left: 0;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 20px 15px 0 0;
        width: auto;
        z-index: 9999;
        overflow-y: auto;
    }

    .menu-video button {
        width: 200px;
        display: flex;
        align-items: center;
        background-color: rgb(14, 13, 13);
        border: none;
        padding: 10px 50px 10px 10px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        margin: 0 25px 0 25px;
    }

    .menu-video span {
        background-color: transparent;
    }

    .menu-video button img {
        margin-right: 8px;
        width: 24px;
        height: 24px;
        background-color: transparent;
        padding: 0 20px 0 0;
    }

    .menu-video button:hover {
        background-color: rgba(65, 65, 65, 0.458);
        cursor: pointer;
        border-radius: 10px;
    }
  
    .menu-video ul {
        background-color: rgb(14, 13, 13);
        padding: 0;
    }

</style>