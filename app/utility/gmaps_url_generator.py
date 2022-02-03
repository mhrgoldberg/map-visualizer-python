import os


def create_url(polyline, size):
    api_key = os.environ.get("GOOGLE_API_KEY")
    url = "https://maps.googleapis.com/maps/api/staticmap?&path=color:0x5bc0be%7Cenc:"
    options = f"&size={size}x{size}&key={api_key}"
    return url + polyline + options
