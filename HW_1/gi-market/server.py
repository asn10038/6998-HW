from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


# INFINITY
current_id = 4

gis = [
    {
        "id": 1, 
        "seller": "James D. Halpert",
        "name": "Fuji Judo Uniform",
        "description": "soft 100% cotton high quality stitching competitively priced",
        "price": 39,
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71FgDhKTzCL._SL1500_.jpg"
    },
    {
        "id": 2, 
        "seller": "James D. Halpert",
        "name": "Fuji Judo Uniform",
        "description": "soft 100% cotton high quality stitching competitively priced",
        "price": 39,
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71FgDhKTzCL._SL1500_.jpg"
    },
    {
        "id": 3, 
        "seller": "James D. Halpert",
        "name": "Fuji Judo Uniform",
        "description": "soft 100% cotton high quality stitching competitively priced",
        "price": 38,
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71FgDhKTzCL._SL1500_.jpg"
    }
]

'''
sales = [

]


clients = [
];
'''




@app.route('/')
def hello_world():
   return 'Hello World'


@app.route('/gi-market')
def gi_market():
    return render_template('gi-market.html', gi_list=gis)

@app.route('/create_gi', methods=['GET', 'POST'])
def create_gi():
    print("create_gi")
    global gis
    global current_id

    gi_data = request.get_json()    
    gi_data["id"] = current_id
    current_id += 1
    gis.append(gi_data)

    return jsonify(gi_list=gis)

@app.route('/update_gi', methods=['GET', 'POST'])
def gi_update():
    global gis
    print("update gi")

    update_json = request.get_json()
    update_id = int(update_json["id"])

    for item in gis:
        if item["id"] == update_id:
            item["seller"] = update_json["seller"]
            item["name"] = update_json["name"]
            item["description"] = update_json["description"]
            item["price"] =int(update_json["price"])
            item["image_url"] = update_json["image_url"]

    return jsonify(gi_list=gis)

@app.route('/delete_gi', methods=['GET', 'POST'])
def gi_delete():
    global gis

    id_json = request.get_json()
    print(id_json)
    delete_id = int(id_json["id"])
    print("delete_sale id: {}".format(delete_id))

    
    index_to_delete = None
    for (i, s) in enumerate(gis):
        if s["id"] == delete_id:
            print("found item to delete: ")
            print(i, s)
            index_to_delete = i
            break


    if index_to_delete is not None:
        print("deleting: ", index_to_delete)
        del gis[index_to_delete]
    
    print("new gi array")
    return jsonify(gi_list = gis)
    

@app.route('/search_gi', methods=['GET', 'POST'])
def gi_search():
    res = []  
    ids = set()
    query_json = request.get_json()
    print(query_json)
    query = query_json["query"]
    print(query)
    for ind, gi in enumerate(gis):
        for item in gi:
            print(query + " : " + str(gi[item]))
            if query in str(gi[item]):
                print("adding")
                ids.add(ind)
    for num in ids:
        res.append(gis[num])
    return jsonify(gi_list = res) 

@app.route('/infinity')
def infinity():
   return render_template('cu-paper-infinity.html', sales = sales, clients = clients)

@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():
    print("save_sale")
    global sales
    global clients
    global current_id   

    #UPDATES SALES
    sale_data = request.get_json()    
    sale_data["id"] = current_id
    current_id += 1
    #prepend the new sale to the sales data.
    #sales = [sale_data] + sales
    sales.append(sale_data)

    #UPDATE CLIENTS
    sale_client = sale_data["client"]
    if sale_client not in clients:
        clients.append(sale_client)
        print("added to clients: "+sale_client)
    else:
        print("did NOT add client: "+ sale_client)


    return jsonify(sales = sales, clients = clients)


@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
    print("delete_sale")
    global sales
    global client
    #global current_id   


    id_json = request.get_json()
    print(id_json)
    #sale_data["id"] = current_id
    
    delete_id = int(id_json["id"])
    print(delete_id)

    # find the sales record with this id, and delete it.
    index_to_delete = None
    for (i, s) in enumerate(sales):
        s_id = s["id"]
        print(s["id"])
        if s_id == delete_id:
            print("found it: ")
            print(i, s)
            index_to_delete = i

            break


    if index_to_delete is not None:
        print("deleting: ", index_to_delete)
        del sales[index_to_delete]
    
    print("new sales array")
    print(sales)


    #sales.append(sale_data)

    return jsonify(sales = sales)

if __name__ == '__main__':
   app.run(debug=True, host='128.59.21.103')




