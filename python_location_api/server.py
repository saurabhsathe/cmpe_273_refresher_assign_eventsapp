from flask import Flask, jsonify, request
from flask_cors import CORS
import http.client, urllib.parse
import json

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
    
def write_json(data,filename="events.json"):
  with open(filename,'r+') as file:
      fdata = json.load(file)
      fdata["events_data"].append(data)
      file.seek(0)
      json.dump(fdata, file, indent = 4)  
  return True      


@app.route('/addEvent', methods =['GET','POST'])
def add_event():
    events_str=request.args.get("events_str")
    event_name=request.args.get("event_name")
    event_json=json.loads(events_str)
    if write_json({event_name:event_json["event_name"]},"events.json"):
        return {"status_code":200,"response_txt":"done"}
    else:
        return {"status_code":404,"response_txt":"Something went wrong"}

@app.route('/getEvents', methods =['GET','POST'])
def get_events():
    
    with open("events.json",'r+') as file:
      fdata = json.load(file)
      return {"event_arr":fdata,"status_code":200,"response_txt":"done"}
    


    
if __name__ == '__main__':
	app.run(debug = True,port=4444,host="127.0.0.1")
