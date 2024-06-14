let winning_streaks = ['123', '456', '789', '147', '258', '369', '159', '357'];
let avaliable_boxs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// ------------------------
let player_1_text = 'X';
let player_2_text = 'O';
let compute_player_text = 'U';
let number_players = 0;
// ------------------
const play_btn = document.getElementById('play-btn');
let one_player_selection = document.getElementById('one-player');
let two_players_selection = document.getElementById('two-players');
// ------------------

let play_type = () => {
    // document.querySelector('#tick-boxes-parent-container').classList.remove('tick-boxes-parent-container');
    document.getElementById('greetings-text').innerHTML = 'How many players do you want in the game?'
    // ---------------------------
    play_btn.style.display = 'none';
one_player_selection.classList.remove('required_players');
two_players_selection.classList.remove('required_players');
}

play_btn.addEventListener('click', play_type);