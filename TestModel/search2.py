# -*- coding: utf-8 -*-

from django.shortcuts import render
#from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt   
from django.http import HttpResponse
import json
@csrf_exempt  
# 接收POST请求数据
def search_post(request):
   ctx ={}
   return HttpResponse("你好啊")
   # ctx.update(csrf(request))
   if request.POST:
      ctx['rlt'] = request.POST['a']
      a=json.dumps(ctx)
      return HttpResponse(a)
   else:

   	  return render(request, "post.html")