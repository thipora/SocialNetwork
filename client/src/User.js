export class User{
    constructor(id,name,userNmae,email,street, suite, city,zipcode,lat,lng,phone,website,cname,catchParse,bs){
        this.id=id
        this.name=name
        this.userNmae=userNmae
        this.email=email
        this.adress= new Adress(street,suite,city,zipcode,lat,lng)
        this.phone=phone
        this.website=website
        this.company=new Company(cname,catchParse,bs)
    }
}

export class Adress{
    constructor(street,suite,city,zipcode,lat,lng){
        this.street=street
        this.suite=suite
        this.city=city
        this.zipcode=zipcode
        this.geo= new Geo(lat,lng)
    }
}

export class Geo{
    constructor(lat,lng){
        this.lat=lat
        this.lng=lng
    }
}

export class Company{
    constructor(name,catchParse,bs){
        this.name=name
        this.catchParse=catchParse
        this.bs=bs
    }
}

