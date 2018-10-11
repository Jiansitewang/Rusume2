!function () {
  var view = document.querySelector('section.message')

  let model = {
    init: function () {
      var APP_ID = 'YRnz8E4vVkPA4U29WBOoFxmr-gzGzoHsz';
      var APP_KEY = 's9yycLcF9E3QLWBvxJfeWazR';
      AV.init({appId: APP_ID, appKey: APP_KEY});
    },
    //获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find() //promise对象
    },
    //创建数据
    save: function (name, content) {
      //增加数据库的表(class)
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({ //promise对象
        'name': name,
        'content': content
      })
    }
  };

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view) {
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#form')
      console.log(this.form)
      this.inputContent = view.querySelector('#inputContent')
      this.inputUserName = view.querySelector('#inputUserName')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        })
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {
        console.log(e)
        e.preventDefault()
        console.log(3)
        this.saveMessage()
        console.log(2)
      })
    },
    saveMessage: function () {
      let divInput = this.inputContent
      let divUserName = this.inputUserName
      let content = divInput.querySelector('input[name=content]').value
      let name = divUserName.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        divInput.querySelector('input[name=content]').value = ''
        divUserName.querySelector('input[name=name]').value = ''
      })
    },
  }
  controller.init(view)
}.call()

