from flask import Flask, jsonify, request
from flask_cors import CORS
import http.client, urllib.parse

app = Flask(__name__)
CORS(app)

@app.route('/test', methods =['GET','POST'])
def test():
    conn = http.client.HTTPConnection('api.positionstack.com')
    lat_lon=request.args.get("latitude_longitude")    
    params = urllib.parse.urlencode({
    'access_key': '69499ba2ef95fbf98d739fd13fb4ccf8',
    'query': lat_lon,
    })
    #print(lat_lon)
    
    conn.request('GET', '/v1/reverse?{}'.format(params))
    #print(lat_lon)
    res = conn.getresponse()
    data = res.read()

    return data.decode('utf-8')
    """
    return "received"
    """

if __name__ == '__main__':
	app.run(debug = True,port=4444,host="127.0.0.1")
