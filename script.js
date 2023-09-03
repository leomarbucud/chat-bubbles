const input = document.querySelector(`.input-text`);
const chat = document.querySelector(`.chat`);
input.addEventListener('input', function(e) {
    // check who is typing
    const who = document.querySelector(`[name="who"]:checked`).value;

    let lastMessages = document.querySelector(`.chat .messages.${who}:last-child`);

    // create last messages
    if( ! lastMessages ) {
        lastMessages = document.createElement('div');
        lastMessages.classList.add('messages', who);
        chat.appendChild(lastMessages);
    }

    let active = lastMessages.querySelector(`.active`);
    if( ! active ) {
        active = document.createElement(`div`);
        active.classList.add('message', 'active', 'last');
        lastMessages.appendChild(active);
    }
    active.innerText = input.value;
    chat.classList.add('typing');
});

function clear() {
    const lastMessage = document.querySelector(`.chat .messages:last-child`);
    chat.classList.remove('typing');
    input.focus();
    if( ! lastMessage ) return;
    const active = lastMessage.querySelector('.active');
    if( active ) {
        active.classList.remove('active');
        input.value = '';
    }
    const lasts = lastMessage.querySelectorAll(`.last`);
    lasts.forEach(elem => {
        elem.classList.remove('last');
    });
    const last = lastMessage.querySelector(':last-child');
    if( last ) {
        last.classList.add('last');
        fade(last);
    }
}

function fade(elem) {
    setTimeout(() => {
        elem.classList.add('fade', 'move');
        setTimeout(() => {
            elem.remove();
        }, 500);
    }, 5000);
}

input.addEventListener('keyup', e => {
    if( e.key != 'Enter' ) return;

    clear();
});

window.addEventListener('keydown', e => {

    const ctrl = e.ctrlKey;

    if( ctrl && e.key == 2 ) {
        document.getElementById('mine').checked = true;
        e.preventDefault();
        clear();
    } else if( ctrl && e.key == 1 ) {
        document.getElementById('yours').checked = true;
        e.preventDefault();
        clear();
    }
});
