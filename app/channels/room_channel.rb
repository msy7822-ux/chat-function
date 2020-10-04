class RoomChannel < ApplicationCable::Channel
  # フロントエンドとバックエンドを監視しあう際に使うメソッド（つながったときに実行されるメソッド）
  def subscribed
    # このsubscribedメソッドの実行時に一回処理が止まっている
    # フロントエンドからデータがこないか見張れている（しょえりが止まっていたらtrue）
    # 処理が実行されたか否かを確認する
    # binding.pry
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # フロントエンドから渡ってきたデータを受け取って、データベースに保存する
    message = Message.create!(content: data['message'])
    # パーシャルのビューそのものを、コントローラーから取得する
    # template = ApplicationController.renderer.render(partial: 'messages/message', locals: {massage: message})
    # room_channelとは、room.jsの1行目で作成されているチャンネル名で、その名前のチャンネルに、二つ目の引数のデータを送信する
    ActionCable.server.broadcast 'room_channel', data['message']
  end
end
