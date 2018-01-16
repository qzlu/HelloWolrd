from django.http import HttpResponse
from django.shortcuts import render_to_response
import MySQLdb
from django.views.decorators.csrf import csrf_exempt 
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
import json
from TestModel.models import user ,count,overTime
import io
import hashlib
from django.forms.models import model_to_dict
from django.core import serializers

@csrf_exempt
def hello(request):
	return render_to_response('index.html')
# 随机字母:
def rndChar():
	text=""
	for  x in range(4):
		text+=chr(random.randint(65, 90))
	return text

# 随机颜色1:
def rndColor():
    return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))

# 随机颜色2:
def rndColor2():
    return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))
@csrf_exempt
def getImage(request):
	# 240 x 60:
	width = 60
	height = 34
	image = Image.new('RGB', (width, height), (255, 255, 255))
	# 创建Font对象:
	font = ImageFont.truetype('C:\Windows\Fonts\Arial.ttf', 18)
	# 创建Draw对象:
	draw = ImageDraw.Draw(image)
	# 填充每个像素:
	for x in range(width):
	    for y in range(height):
	        draw.point((x, y), fill=rndColor())
	# 输出文字:
	text=rndChar()
	request.session['yanzhengma'] = text
	draw.text((5, 5), text, font=font, fill=rndColor2())
	# 模糊:
	#image = image.filter(ImageFilter.BLUR)
	stream=io.BytesIO()
	image.save(stream,"png")
	return HttpResponse(stream.getvalue())
@csrf_exempt
def login(request):
	test1=request.POST['FValidateCode'].upper()
	if test1==request.session['yanzhengma']:
		try:
			md5 = hashlib.md5()
			md5.update(request.POST['FPassword'].encode('utf-8'))
			result=user.objects.get(name=request.POST['FUserName'],password=md5.hexdigest())
			return HttpResponse("登录成功")
		except Exception as e:
			print(e)
			return HttpResponse("用户名或密码错误")
	else:
		return HttpResponse("验证码错误")
@csrf_exempt
def register(request):
	if request.POST:
		try:
			result=user.objects.get(name=request.POST['username'])
			return HttpResponse("用户名已存在")
		except Exception as e:
			print('except:', e)
			md5 = hashlib.md5()
			md5.update(request.POST['psd'].encode('utf-8'))
			user1=user(name=request.POST['username'],password=md5.hexdigest())
			user1.save()
			return HttpResponse("注册成功")
	else:
		return render_to_response('register.html')

def count1(request):
	result=count.objects.get(id=1)
	di = model_to_dict(result,exclude=['id'])#转化为dict
	return HttpResponse(json.dumps(di))
	pass

def overtime(request):
	arr=[]
	re=overTime.objects.all()
	for var in re:
		di = model_to_dict(var,exclude=['id','date'])
		arr.append(di)
	return HttpResponse(json.dumps(arr))