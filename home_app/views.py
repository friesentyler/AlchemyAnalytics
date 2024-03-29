from django.shortcuts import render
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied
import os
from django.http import HttpResponse, Http404

def index(request):
    return render(request, 'index.html', {})

def shop(request):
    return render(request, 'HTML/Pages/shop.html', {})

def checkout(request):
    return render(request, 'HTML/Pages/checkout.html', {})

def account(request):
    if request.user.is_authenticated:
        return render(request, 'HTML/Pages/account.html', {})
    else:
        raise PermissionDenied()

'''def download_file(request, file_name):
    file_path = os.path.join("media/", file_name)
    print(file_path)
    print(os.path.basename(file_path))
    if request.user.is_authenticated:
        if os.path.exists(file_path):
            with open(file_path, 'rb') as f:
                response = FileResponse(f)
                response['Content-Type'] = 'application/octet-stream'
                response['Content-Disposition'] = 'attachment; filename="{0}"'.format(os.path.basename(file_path))
                return response
        raise ObjectDoesNotExist()
    else:
        raise PermissionDenied()'''

def download_file(request, file_name):
    # Define the custom directory where your files are stored
    custom_directory = "media/"

    file_path = os.path.join(custom_directory, file_name)

    # Ensure user is authenticated
    if not request.user.is_authenticated:
        raise PermissionDenied()

    # Check if the file exists
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            # needs to redirect to home page
            redirect("index")
            return response
    else:
        raise Http404()