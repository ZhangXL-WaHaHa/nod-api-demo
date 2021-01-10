# Node后端模板代码

## 前言

之前也写过简单的node服务器代码，但不算做事一个工程，这一次因为也需求，就写了这套后端模板。

从git上找的一些node模板，功能是可以实现，但工作流程理解起来有点困难，可能是小弟我水平有限，故搜罗了很多源码，按照自己的理解写了这套模板。基本通道都已经打通，没有做前端页面，只用了一个输入框和一个按钮来请求后端的数据，在控制台打印显示。纯粹是做一个后端开发的代码。

源码放在[gitee](https://gitee.com/zhongweiing/base-station-server)和github上面，需要的伙伴可以自行下载一下。里面每行代码都有详细的注释，这里主要是讲解一下代码的工作流程和主要模块的分布。

## 下载运行

在gitee或者github下载源码到本地，首先确保本地安装了node环境。测试方法为在命令行中输入`node -v`，如果出现版本号，就代表安装了node环境。

在当前目录下打开cmd命令行，然后输入`npm install`安装这套项目所需要的依赖库，安装完成后可以发现项目中多了一个`node_modules`文件夹。

以上及把项目部署完成了，接下来就是运行了，还是在当前目录下面的命令行运行`npm start`,出现一下带领代码就代表运行成功，然后就不用关闭命令行，让他运行着，就相当于一台服务器一直在本地跑着一样，后面我们就可以开始请求数据了。

```js
> basestationserver@0.0.0 start D:\.project\myself\BaseStationServer
> node ./bin/www
```

## 新建项目

如果不想用我的代码，也可以直接新建一个node工程，还是需要你的环境，在指定文件夹目录下面打开cmd命令窗口。

首先全局安装express框架`npm install -g express`，安装完成好这个框架后，还不能生成项目，得再安装一个express项目生成器(express-generator)，运行命令`npm install -g express-generator`，这一步也是全局安装，之后之后就不需要再次安装这两个东东了。

然后我们在当前指定的目录命令行中运行`express projectName`，projectName是你自己想要创建的工程名。运行完成后就可以看见一个项目生成了，然后进入到刚刚新建的工程目录下面。打开cmd窗口命令行，输入`npm install`来安装依赖。至此项目及创建完了。

下面就来运行这个项目，在浏览器中输入`localhost:3000`，就可以访问到这个node服务器啦。

大功告成！但是你以为完了吗？不，重点在后面。

## 模块讲解

上面自己生成了自己的项目，但我这里分析的还是以我那套模板代码来进行分析。

```JavaScript
|--api   这个文件夹是直接手动生成了，所有的接口代码处理都放在这里面
|--bin   项目的执行文件
	|--www    里面有一个参数，可以手动修改自己想要的端口号，直接更改里面的port后面的3000，因为项目默认是3000端口
|--config  这个文件也是手动创建的，项目写的是数据库的配置信息
|--node_modules   依赖库
|--public    静态的文件都放在这里面，比如一些第三方库啥的
|--routes    路由文件，规定每个URI调用的接口函数
|--utils	手动创建的，封装了一些常用的工具类函数，方便使用
|--views	这里面是视图代码，我没有用到
|--app.js	项目运行的主入口文件
|--package.json	工程的一些配置信息
```

首先先配置好config项目的数据库配置信息文件，然后utils文件夹下面的一些文件可以直接考过去，都是封装好的，没什么多讲的。views和public文件夹我们暂时用不掉，因为不做网页开发，就只是纯粹搭一个后台。

主要修改的代码在app.js，api文件夹，routes文件夹。

### 1、API核心代码

首先对api文件夹进行分析讲解。这个文件夹下面创建了hello/test文件夹和baseApi.js。这个js文件主要是对数据库操作的代码进行了封装，可以先不要看，等看完那两个文件夹下面的所有代码后就会发现，这和那些代码都非常的相似，只不过我把他封装了。

在hello文件夹下面，有一个js文件，写了两个函数`hello1，hello2`,主要功能就是查询数据库里面的数据，然后返回给前端。在最开始需要导入要写库，然后导入自己的数据库配置文件，可以发现，DBConfig前面有一个@符号，这个符号代表的是项目的根目录，从根目录获取到这个文件的信息。这个和Vue有点一样，但这个需要我们自己配置，可以看这篇文章[《Node项目使用@代替根目录》](https://blog.csdn.net/qq_42376617/article/details/108919255)来看怎么配置的。

完成这两个函数后，一定要写上下面的代码，把这两个函数导出出去，然后这一部分就完成了。

```javascript
module.exports = {
    hello1,
    hello2
};
```

test文件夹下面的testAPI.js文件也是一样的道理，功能主要是进行插入和修改数据库。就不再一一分析了。

然后test文件夹下面还有一个testAPI_2.js文件，这个文件功能和helloAPI.js一样，只不过由几行代码就完成了这些功能，这主要是调用baseAPI.js里面封装好的函数，之后我们开发就省事多了。

后端的函数写好了，下面就来讲解一下怎么给前端请求。

### 2、路由配置

前端请求后端的数据是通过URL地址来请求的，我们上面写好的函数就是给前端来请求的，只有前端发出了请求，那么后端才会调用某一块代码去执行他。

那么如何设置这个URL呢。首先简单说一下这个URL的组成，像这个项目中的一个接口地址为`http://localhost:8000/api/hello/hello1`，一般在浏览器了可以不需要输入http://，因为浏览器会自动补全。localhost就是本地的IP地址，当然了也可以换成`127.0.0.1`，或者查看本机的局域网IP地址，都可以进行访问。端口号我之前把那个3000换成了8000，这是自己配置的，如果是直接生成的项目，就默认3000。然后后面的/api/hello/hello1就是我们自己设置的接口地址了。

这里以routes/hello.js为例，test.js和这个一样,就不讲解了。首先开头引入路由需要的模块。然后把上面写好的函数给他导入进来，这里直接导入文件的路径就可以了。然后设置是get请求还是post请求，以及请求的路径是什么，且这个路径对应哪个函数。最后把这个模块进行导出去，因为我们只是设置了最后一个路径，后面还需要用到这个模块。

```javascript
//引入模块
var express = require('express');
var hello = express.Router();
//导入写好的函数
var helloApi = require('@/api/hello/helloAPI')
//设置接口路径，这里的post表示的是前端发送的请求必须是post请求，如果是get，那么久不会调用这个函数。当然我们也可以根据需要吧这里的post换成get。然后第一次参数代表的是请求的地址，这个地址是上面http://localhost:8000/api/hello/hello1的最后一个路径hello1，然后对应的函数是hello1这个函数，也就是说，前端如果请求的是hello1这个路径，那么后台调用的就是hello1这个函数。
hello.post('/hello1', helloApi.hello1);
hello.post('/hello2', helloApi.hello2);
//把这个模块导出
module.exports = hello;
```

### 3、主入口文件(app.js)

上面讲了如何去设置接口，然后哪个接口调用哪个函数，这倒是我们自己规定好的。我们只需要告诉前端，这个接口是什么，他直接去请求就行了，不用知道后台是如何实现的。

在app.js里面，找到设置路由这一块代码，这个模块就是暴露给前端请求的接口地址了。里面其他详细的代码我就不一样讲解了，我都写了注释，可以一个一个去查看。

```javascript
//---------------------------设置路由---------------------------
app.use('/api/test', require('./routes/test'));
app.use('/api/hello', require('./routes/hello'));
```

这里的第一个参数和上面那个意思一样，人为规定好路径，因为代码写的地方都在api文件夹下面，然后每个文件夹给他设置不同的接口地址，都是以文件夹的名字来命名接口的地址的，这样方便我们管理，一看就知道调用那个函数了，到时候报错了也好进行维护。

第二个参数就是导入刚刚的路由文件了，我们在路由文件里面也定义了一个接口地址hello1，在那里面我们设置的是调用那个函数名而在app.js里面设置的是调用那个文件夹，这样一级一级规范方便后期的维护和团队的合作。也就是因为我们在路由文件设置了hello1，所以整个接口的路径地址就为二者的相加啦！`/api/hello/hello1`，前端只要请求这个地址就可以获得数据了。

### 4、跨越问题的解决

我们在请求数据的时候，可以回遇到跨域问题，控制台一般会这样的报错误。

```
Access to XMLHttpRequest at 'http://localhost:8000/api/hello/hello1' from origin 'http://localhost:8000
```

出现这种问题就说明出现了跨域的问题。跨域，顾名思义就是跨了两个不同的域名，浏览器认为只要ip、端口、协议三个有一个不同就是不同的域，所以就得解决这个问题。在app.js里面新增如下代码，就可以完美解决可以问题了。

```javascript
//---------------------------设置跨域请求---------------------------
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
```

## 请求数据

上面把后端部署好了之后，完美就可以在前端随便写个网页来请求数据了。我在views项目写了一个简单的网页，一个输入框和一个按钮，就可以后端发送请求了。

```javascript
    $(".btn").on("click",function(){
        //这里输入的是接口的地址，因为其他一样的完美都写了，
        //调用hello1接口，可以在输入框里面写上/hello/hello1
        //调用hello2接口，可以在输入框里面写上/hello/hello2?emp_sex=1，这里带了一个参数，因为后端设置了参数去查询数据库
        var inputText = $('#in').val();
        $.post({
            url: "http://localhost:8000/api"+inputText,
            success: function(res){
                //成功后会返回数据，并在控制台打印
                console.log(res)
            },
            error: function(res){
                console.error("错误",res)
            }
        })
    })
```

到此，这套模板就分析完了，如果有不懂的伙伴可以下方留言。