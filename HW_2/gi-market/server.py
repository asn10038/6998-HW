from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


# INFINITY
current_id = 31 

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
        "seller": "Fighters Market",
        "name": "KINGZ THE ONE JIU JITSU GI - FREE WHITE BELT",
        "description": " M High Tech Pearl Weave jacket Triple reinforced stitching across all stress points",
        "price" : 90,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/7Q0A1022-s_grande_68bcba45-d4bc-40fd-a888-2321e5435623_1800x.jpg"
    },
    {
        "id": 3, 
        "seller": "Fighters Market",
        "name": "KINGZ SPORT JIU JITSU GI",
        "description": " M Micro Pearl Weave Triple reinforced stitching across all stress points",
        "price" : 100,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/7Q0A1022-s_grande_68bcba45-d4bc-40fd-a888-2321e5435623_1800x.jp://cdn.shopify.com/s/files/1/1933/2043/products/yoG1zPyp_e4586d66-40e0-497a-8276-16edfa39c83f_584x.jpg"
    },
    {
        "id": 4, 
        "seller": "Fighters Market",
        "name": "KINGZ SPORT JIU JITSU GI",
        "description": " M Micro Pearl Weave Triple reinforced stitching across all stress points",
        "price" : 100,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/7Q0A1022-s_grande_68bcba45-d4bc-40fd-a888-2321e5435623_1800x.jp://cdn.shopify.com/s/files/1/1933/2043/products/yoG1zPyp_e4586d66-40e0-497a-8276-16edfa39c83f_584x.jpg"
    },
    {
        "id": 5,
            "seller": "Fighters market",
            "name": "Kingz Nano 2.0 Jiu Jitsu Gi",
        "description": "400 GSM Pearl Weave Triple reinforced stitching across all stress points Made of one piece of fabric for superior strength and durability",
        "price": 130,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/7Q0A1121_copy_584x.jpg"
                            },
                            {
        "id": 6,
        "seller": "Fighters market",
        "name": "KINGZ THE ONE KIDS JIU JITSU GI - FREE WHITE BELT",
        "description": "Kid's cut!  400 GSM High Tech Pearl Weave jacket ",
        "price": 70,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/lo6xG9E_grande.jpeg?v=1552948396"
                                                    },
                                                    {
        "id": 7,
        "seller": "Fighters market",
        "name": "KINGZ KIDS COMP V5 JIU JITSU GI",
        "description": "Kid's fit 425 GSM Pearl Weave jacket ",
        "price": 90,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/Close-3_584x.jpg"
                                                                            },
                                                                            {
        "id": 8,
        "seller": "Fighters market",
        "name": "ATAMA MUNDIAL KIDS GI",
        "description": "he Atama model preferred by its athletes and consumers is now available to future champions.  Jacket is made from a single piece of woven 100% cotton fabric ",
        "price": 80,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/atama-kids-mundial-wht-1_grande.png?v=1530369123"
                                                                                                    },
                                                                                                    {
        "id": 9,
        "seller": "Fighters market",
        "name": "MAEDA RED LABEL KID'S JIU JITSU GI",
        "description": "Maeda Brand prides itself on delivering the highest quality gis and gear. They don't disappoint with their Red Label Kid's Jiu Jitsu Gi, featuring a lightweight yet durable 375 super fine pearl weave jacket and 8 oz drill cotton pants. ",
        "price": 65,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/Untitled-1_csospy_584x.jpg"
                                                                                                                                    },
                                                                                                                            {
        "id": 10,
        "seller": "Fighters market",
        "name": "MAEDA RED LABEL KID'S JIU JITSU GI",
        "description": "Tatami presents their new and improved Nova jiu jitsu gi: the Tatami Nova Mk4 BJJ Gi. The Nova Mk4 features a lightweight 425 GSM Hybrid Weave jacket, durable 9 oz",
        "price": 70,
        "image_url": "https://cdn.shopify.com/s/files/1/1933/2043/products/tatami-nova-mk4-blue-1_584x.jpg"
                                                                                                                                                            },
{
    "id": 11,
    "seller": "Hayabusa",
    "name": "The punisher Gi",
    "description": "The Punisher Gi was built to become your ultimate weapon. Durable, comfortable, and incredibly light. The dark rugged design is accompanied by Frank’s signature",
    "price": 200,
    "image_url": "https://hayabusa-prismic.imgix.net/764f8c2d85478126be98e31d5f63e667b3f77a09_punishergi_social_2_2160x2160.jpg?w=1200&fm=pjpg&auto=format"

    },
    {
    "id": 12,
    "seller": "Hayabusa",
    "name": "Gold Weave Warrior Jiu Jitsu Gi",
    "description": "This premium quality, heavyweight gi, with reinforced stitching lets you roll without limitations. You’ll feel like a warrior in durable armor, but have all the comforts of the ultra-soft gold weave interior.",
    "price": 140,
    "image_url": "https://hayabusa-us.imgix.net/products/Goldweave_Black_GalleryImg2b.png?fm=pjpg&q=50&w=1200&h=1200&fit=fill"
    },
                                    {
    "id": 13,
    "seller": "Hayabusa",
    "name": "Pearl Weave Ultra-Light Jiu Jitsu Gi",
    "description": "Built with some of the lightest gi materials ever made, the Pearl Weave Ultra-Light Jiu Jitsu Gi feels super light and flows with your every move.",
    "price": 120,
    "image_url": "https://hayabusa-us.imgix.net/products/LightWeightGi_Moy_MainImage_SquareCrop_Feb07_2019.png?fm=pjpg&q=50&w=1200&h=1200&fit=fill"
    },

    {
    "id": 14,
    "seller": "Hayabusa",
    "name": "Pearl Weave Ultra-Light Jiu Jitsu Gi",
    "description": "Built with some of the lightest gi materials ever made, the Pearl Weave Ultra-Light Jiu Jitsu Gi feels super light and flows with your every move.",
    "price": 120,
    "image_url": "https://hayabusa-us.imgix.net/products/LightwightGi_Gray_Model_Img5_94ab219c-00f9-4632-abda-d933f2535292.png?fm=pjpg&q=50&w=1200&h=1200&fit=fill"
    },

    {
    "id": 15,
    "seller": "Hayabusa",
    "name": "Gold Weave Goorudo 3 Jiu Jitsu Gi",
    "description": "Meticulous attention to detail guarantees perfection in every aspect of this gi’s design. Heavyweight gold weave for comfort without restriction. Reinforced stress areas and the",
    "price": 150,
    "image_url": "https://hayabusa-us.imgix.net/products/GG3JJG-W.png?fm=pjpg&q=50&w=1200&h=1200&fit=fill"
    },
    {
    "id": 16,
    "seller": "Hayabusa",
    "name": "Gold Weave Youth Jiu Jitsu Gi",
    "description": "Meticulous attention to detail guarantees perfection in every aspect of this gi’s design. Ultra-soft gold weave for comfort without restriction. Reinforced stress areas and the finest cotton for strength and durability. Intricately stitched and detailed for both function and style.",
    "price": 70,
    "image_url": "https://hayabusa-us.imgix.net/products/YouthGi_White_Front_3Q_Nov30_2017.png?fm=pjpg&q=80&w=585&h=585&fit=fill"
    },
    {
    "id": 17,
    "seller": "Venum",
    "name": "VENUM CONTENDER EVO BJJ GI - WHITE",
    "description": "Jacket: Pearl Wave 350 gsm cottonPant: 230 gsm cottonInner woven customed tape (at jacket bottom, sleeve opening and pant opening)Sleeve's embroideries Inner jacket screen printInner side vent screen printed triangle reinforcement",
    "price": 95,
    "image_url": "https://www.venum.com/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/f/d/fdc28037c344862bc866bb89042d82ca019213ac_BJJ_GI_CONTENDER_EVO_WHITE_1500_12.jpg"
    },
                                                    {
    "id": 18,
    "seller": "Venum",
    "name": "VENUM CONTENDER EVO BJJ GI - DARK GREY",
    "description": "Jacket: Pearl Wave 350 gsm cottonPant: 230 gsm cottonInner woven customed tape (at jacket bottom, sleeve opening and pant opening)Sleeve's embroideries Inner jacket screen printInner side vent screen printed triangle reinforcement",
    "price": 100,
    "image_url": "https://www.venum.com/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/4/7/471b77456bcb642b067e61de93af31a4a7445288_BJJ_GI_CONTENDER_EVO_GREY_1500_12.jpg"
    },
    {
    "id": 19,
    "seller": "Venum",
    "name": "VENUM CONTENDER EVO BJJ GI - ROYAL BLUE",
    "description": "Jacket: Pearl Wave 350 gsm cottonPant: 230 gsm cottonInner woven customed tape (at jacket bottom, sleeve opening and pant opening)Sleeve's embroideries Inner jacket screen printInner side vent screen printed triangle reinforcement",
    "price": 100,
    "image_url": "https://www.venum.com/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/4/3/438dcd18d2486236d59e794e1911083bf0ccf1a2_BJJ_GI_CONTENDER_EVO_BLUE_1500_12.jpg"
    },
    {
    "id": 20,
    "seller": "Venum",
    "name": "VENUM CONTENDER EVO BJJ GI - BLACK",
    "description": "Jacket: Pearl Wave 350 gsm cottonPant: 230 gsm cottonInner woven customed tape (at jacket bottom, sleeve opening and pant opening)Sleeve's embroideries Inner jacket screen printInner side vent screen printed triangle reinforcement",
    "price": 100,
    "image_url": "https://www.venum.com/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/d/4/d457e475a112a38923cb0dcca6178a8edc5b1313_BJJ_GI_CONTENDER_EVO_BLACK_BLACK_1500_12.jpg"
        },
        {
    "id": 21,
    "seller": "rollmore",
    "name": "93brand \"Slate Camo\" BJJ Gi - Black",
    "description": "BJJF approved 350 GSM MicroPearl Weave top 8oz Twill Cotton pants Collar wrapped with thick \"Twin Twill\" hybrid cotton Thicker & wider EVA foam collar core",
    "price": 140,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-slatecamoblk-gi/product/93-slatecamoblk-gi.jpg"
    },
    {
    "id": 22,
    "seller": "rollmore",
    "name": "93brand \"Goose OG\" BJJ Gi - White",
    "description": "500 GSM pearl weave top 12 oz canvas pants Commemorative 1993 printed patch across seat of the pants (removable) Unbleached collar",
    "price": 140,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-gooseog-gi/product/93-gooseog-gi.jpg"
    },
    {
    "id": 23,
    "seller": "rollmore",
    "name": "93brand \"S6\" Women''s BJJ Gi",
    "description": "475 GSM Advanced Pearl Weave jacket Ultra-soft \"Twin Twill\" Hybrid pants (combination of twill and ripstop) Updated branding and embroideries", 
    "price": 110,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-s6wmns-gi/product/93-s6wmns-gi.jpg"
    },
    {
    "id": 24,
    "seller": "rollmore",
    "name": "itsune \"Views\" Women''s BJJ Gi - Navy",
    "description": "350 GSM Lightweight Pearl Weave 10 OZ Lightweight Ripstop Pants Increased thickness and width throughout the collar Slim and rounded piping along jacket hem",  
    "price": 120,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-s6wmns-gi/product/93-s6wmns-gi.jpg"
    },
    {
    "id": 25,
    "seller": "rollmore",
    "name": "Tatami \"Estilo 6.0\" Women''s BJJ Gi - White/Orange",
    "description": "Printed Jaquard Drawstring 550GSM Pearl Weave Jacket 12oz Canvas Pants",   
    "price": 100,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-s6wmns-gi/product/93-s6wmns-gi.jpg"
    },
    {
    "id": 26,
    "seller": "rollmore",
    "name": "93brand \"Hooks V4\" Women''s BJJ Gi - Royal Blue",
    "description": "425 GSM Advanced Pearl Weave 8 oz Twill Cotton pants 100% cotton construction",   
    "price": 100,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-hooksrylbluwmn-gi/product/93-hooksrylbluwmn-gi.jpg"
    },
    {
    "id": 27,
    "seller": "rollmore",
    "name": "93brand \"Goose OG\" Women''s BJJ Gi - White",
    "description": "500 GSM pearl weave top 12 oz canvas pants Commemorative 1993 printed patch across seat of the pants (removable) Unbleached collar",   
    "price": 140,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-hooksrylbluwmn-gi/product/93-hooksrylbluwmn-gi.jpg"
    },
    {
    "id": 28,
    "seller": "rollmore",
    "name": "93brand \"Hooks V4\" BJJ Gi - Royal Blue",
    "description": "425 GSM Advanced Pearl Weave 8 oz Twill Cotton pants 100% cotton construction Thicker and wider EVA foam collar core",   
    "price": 100,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-hooksroyalblue-gi/product/93-hooksroyalblue-gi.jpg"
    },
    {
    "id": 29,
    "seller": "rollmore",
    "name": "Kitsune \"Heroes\" BJJ Gi - Black",
    "description": "350 GSM Lightweight Pearl Weave 10 OZ Lightweight Ripstop Pants Increased thickness and width throughout the collar",   
    "price": 140,
    "image_url": "https://product_images_rm.s3.amazonaws.com/93-hooksroyalblue-gi/product/93-hooksroyalblue-gi.jp://product_images_rm.s3.amazonaws.com/ks-heroesblkmen-gi/product/ks-heroesblkmen-gi.jp://product_images_rm.s3.amazonaws.com/ks-heroesblkmen-gi/product/ks-heroesblkmen-gi.jpg"
    },
    {
    "id": 30,
    "seller": "rollmore",
    "name": "Tatami \"Estilo 6.0\" BJJ Gi - White/Orange",
    "description": "Printed Jaquard Drawstring 550GSM Pearl Weave Jacket 12oz Canvas Pants Embroidered Tatami Logos",   
    "price": 140,
    "image_url": "duct_images_rm.s3.amazonaws.com/93-hooksroyalblue-gi/product/93-hooksroyalblue-gi.jp://product_images_rm.s3.amazonaws.com/tf-estilo6orangemen-gi/product/tf-estilo6orangemen-gi.jp://product_images_rm.s3.amazonaws.com/tf-estilo6orangemen-gi/product/tf-estilo6orangemen-gi.jpg"
    },

]

def get_gis_by_seller(seller):
    print("SELLER IS "+ seller) 
    res = []
    for gi in gis:
        if gi['seller'] == seller:
            res.append(gi)
    return res
    
@app.route('/')
def hello_world():
   return 'Hello World'

@app.route('/home')
def home_page():
    return render_template('gi-market-home.html', gi_list=gis)


@app.route('/gi-market')
def gi_market():
    return render_template('gi-market.html', gi_list=gis)

@app.route('/gi-sellers/<seller_name>')
def gi_sellers(seller_name):
    res = []
    for gi in gis:
        if gi['seller'].lower() == seller_name.lower():
            res.append(gi)
    return render_template('gi-sellers.html', gi_list=res, seller=seller_name)

@app.route('/create_gi', methods=['GET', 'POST'])
def create_gi():
    print("create_gi")
    global gis
    global current_id

    gi_data = request.get_json()    
    gi_data["id"] = current_id
    current_id += 1
    gis.append(gi_data)
    return jsonify(gi_list=get_gis_by_seller(gi_data["seller"]))


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
            break

    return jsonify(gi_list=get_gis_by_seller(item["seller"]))

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
    
    new_list = get_gis_by_seller(id_json['seller'])
    return jsonify(gi_list = new_list)
    

@app.route('/search/<query_string>', methods=['GET', 'POST'])
def gi_search(query_string):
    res = []
    ids = set()
    query = query_string
    for ind, gi in enumerate(gis):
        for item in gi:
            if query in str(gi[item]):
                print("adding")
                ids.add(ind)
    for num in ids:
        res.append(gis[num])
    print (" I MADE IT HERE")
    return render_template('gi-market.html', gi_list=res)

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

if __name__ == '__main__':
   app.run(debug=True, host='128.59.21.103')


