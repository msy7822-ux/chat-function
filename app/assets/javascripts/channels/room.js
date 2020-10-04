'use strict'

  App.room = App.cable.subscriptions.create("RoomChannel", {
  // バックエンド側とつながったかどうかを確認する
  // rooom_channelでいうところのsubscribedと同じような役割（バックエンド側を監視）
  connected: function() {
    console.log('connected');
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // room_channel.rbのspeakメソッドからroom_channelにデータが送信されたら、ここのrecieveメソッドでそのデータを受け取れる
    let messages = document.getElementById('messages');
    // リロードせずとも、データがどんどん追加されていくようにする
    messages.innerHTML += `<p>${data}</p>`;
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    // this.performを実行することでroom_channelのメソッドを実行できるようになる
    // ここのperformメソッドの引数は、room_channel.rbに定義されているメソッド
    return this.perform('speak', {message: content});
  }
  });


  // ビュー側の入力欄に入力された、データを取得する（DOM）
  // ページが全て表示されてから、JSを実行しなければならない
  document.addEventListener('DOMContentLoaded', function(){
  // 入力欄の中身のデータの取得を行い、inputというへんんすうに格納する
  let input = document.getElementById('chat-input');
  let button = document.getElementById('button');
  button.addEventListener('click', function(){
    let content = input.value; 
    App.room.speak(content);

    // 最後に入力欄のデータを消してあげる
    input.value = '';
  });
  });
