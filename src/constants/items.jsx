import { href } from "react-router-dom"

export const NavBottomComps=[
    {id:1,item:"Search Galleries and Exhibitions",href:'/'},
    {id:2,item:"Gallery List",href:'gallery-list'},
    {id:3,item:"Exhibiting Artists",href:'exhibiting-artists'},
    {id:4,item:"Gallery Maps",href:'gallery-maps'},
    {id:5,item:"Personal Planner",href:'#'},
    {id:6,item:"Art Fairs",href:'#'},
    {id:7,item:"Art Chauffeurs",href:'#'},
    {id:8,item:"Featured Art For Sale",href:'art-for-sale'}
]

export const GalleryItems=[
    {
        id:1,
        name:"Lorem Ipsum",
        image:"img1.jpg",
        website:"monyarowegallery.com",
        address:"224 West 30 Street, Suite #304",
        contact_number:"+123 456 7890",
        opening_hours_full:"10.00 - 17.00",
        overview:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
        facebook:"#",
        instagram:"#",
        location_on_map:"#",
        status:"Open",
        exhibitions:[
            {id:1,
            item_name:"IN THE WINDS",
            item_artist:"Emma White",
            start_date: "July 31, 2025",
           end_date: "August 23, 2025",
            description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            images:"img2.jpg"
            },
            {id:2,
            item_name:"DARK",
            item_artist:"Emma White",
          start_date: "July 31, 2025",
           end_date: "August 23, 2025",
            description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            images:"img3.jpg"
            },
            {
                "id": 37,
                "title": "Dozo !",
                "gallery": 1985,
                "artists": [
                    {
                        "id": 4,
                        "first_name": "Adam",
                        "last_name": "Lester"
                    }
                ],
                "start_date": "July 31, 2025",
                "end_date": "August 23, 2025",
                "description": "Investigating the relationships between people, places and objects, Adam Lester’s work combines elements of anachronism, nostalgia and humor to create dynamic visual assemblages with an escapist sentimentalism to bygone eras. Figurative and symbolic elements are complemented by a vibrant palette blending high and low culture through the lens of popular culture.\r\n \r\nLester’s work has been exhibited broadly in Australia and has been cited in prominent public & private collections internationally.",
                "images": [
                    {
                        "id": 12,
                        "image": "http://192.168.1.182:8000/media/exhibition_images/img1_waqes2T.jpg",
                        "caption": null
                    }
                ]
            }
        ],
    },
    {
        id:2,
        name:"Lorem Ipsum",
        image:"img1.jpg",
        website:"monyarowegallery.com",
        address:"224 West 30 Street, Suite #304",
        contact_number:"+123 456 7890",
        opening_hours_full:"11.00 - 16.00",
        overview:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
        facebook:"#",
        instagram:"#",
        location_on_map:"#",
        status:"Open",
        items:[],
    },
    {
        id:3,
        name:"Lorem Ipsum",
        image:"img1.jpg",
        website:"monyarowegallery.com",
        address:"224 West 30 Street, Suite #304",
        contact_number:"+123 456 7890",
        opening_hours_full:"11.00 - 16.00",
        overview:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
        facebook:"#",
        instagram:"#",
        location_on_map:"#",
        status:"Closed",
        items:[],
    },
    {
        id:4,
        name:"Lorem Ipsum",
        image:"img1.jpg",
        website:"monyarowegallery.com",
        address:"224 West 30 Street, Suite #304",
        contact_number:"+123 456 7890",
        opening_hours_full:"11.00 - 16.00",
        overview:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
        facebook:"#",
        instagram:"#",
        location_on_map:"#",
        status:"Open",
        exhibitions:[
            {id:1,
            title:"IN THE WINDS",
            item_artist:"Emma White",
           start_date: "July 31, 2025",
           end_date: "August 23, 2025",
            description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            images:"img2.jpg"
            },
        ],
    },
]

export const GallerylistAlphabets=[
    {id:1,alpha:'a',data:'#'},
    {id:2,alpha:'b',data:'#'},
    {id:3,alpha:'c',data:'#'},
    {id:4,alpha:'d',data:'#'},
    {id:5,alpha:'e',data:'#'},
    {id:6,alpha:'f',data:'#'},
    {id:7,alpha:'g',data:'#'},
    {id:8,alpha:'h',data:'#'},
    {id:9,alpha:'i',data:'#'},
    {id:10,alpha:'j',data:'#'},
    {id:11,alpha:'k',data:'#'},
    {id:12,alpha:'l',data:'#'},
    {id:13,alpha:'m',data:'#'},
    {id:14,alpha:'n',data:'#'},
    {id:15,alpha:'o',data:'#'},
    {id:16,alpha:'p',data:'#'},
    {id:17,alpha:'q',data:'#'},
    {id:18,alpha:'r',data:'#'},
    {id:19,alpha:'s',data:'#'},
    {id:20,alpha:'t',data:'#'},
    {id:21,alpha:'u',data:'#'},
    {id:22,alpha:'v',data:'#'},
    {id:23,alpha:'w',data:'#'},
    {id:24,alpha:'x',data:'#'},
    {id:25,alpha:'y',data:'#'},
    {id:26,alpha:'z',data:'#'},
]

export const defaultGallerylistitems=[
    {id:1,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:2,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:3,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:4,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:5,name:"Defiance Gallery at Mary Place",href:"/gallery-list-item-details"},
    {id:6,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:7,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:8,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:9,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:10,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:11,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:12,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:13,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:14,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:15,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:16,name:"Lorem Ipsum , monyarowegallery.com",href:"/gallery-list-item-details"},
    {id:17,name:"Dominik Mersch Gallery",href:"/gallery-list-item-details"},
    {id:18,name:"Dickerson Gallery",href:"/gallery-list-item-details"},
    {id:19,name:"Defiance Gallery at Mary Place",href:"/gallery-list-item-details"},
    {id:20,name:"Darren Knight Gallery",href:"/gallery-list-item-details"},
    {id:21,name:"Damien Minton Presents",href:"/gallery-list-item-details"},
    {id:22,name:"D'Lan Contemporary",href:"/gallery-list-item-details"},
    {id:22,name:"Dickerson Gallery",href:"/gallery-list-item-details"},
    {id:22,name:"Dickerson Gallery",href:"/gallery-list-item-details"},
]


export const GalleryItemsDetails=[
    {
        id:1,
        name:"Lorem Ipsum",
        image:"img1.jpg",
        website:"monyarowegallery.com",
        address:"224 West 30 Street, Suite #304",
        contact_no:"+123 456 7890",
        opening_hours_weekdays:"10.00 - 17.00",
        opening_hours_weekends:"11.00 - 16.00",
        overview:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
        facebook_url:"#",
        instagram_url:"#",
        location_on_map:"#",
        status:"Open",
        items:[
            {id:1,
            item_name:"IN THE WINDS",
            item_artist:"Emma White",
            item_exhibition_date:"12 June - 18 June",
            item_details:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
            item_image:"img2.jpg"
            },
        ],
    },
]


export const AllArtists=[
    {
        id:1,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        exhibition_date:"12 June - 18 June",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:2,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        exhibition_date:"12 June - 18 June",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:3,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        exhibition_date:"12 June - 18 June",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
]



export const AllArtForSale=[
    {
        id:1,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:2,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
       price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:3,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:4,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:5,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:6,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
    {
        id:7,
        artist_first_name:"Emma",
        artist_last_name:"White",
        title:"IN THE WINDS",
        gallery_name:"Lorem Ipsum",
        address:"224 West 30 Street, Suite #304",
        phone_number:"+123 456 7890",
        opening_hours:"10.00 - 17.00",
        website:"monyarowegallery.com",
        price:12000,
        image:"img2.jpg",
        exhibition_description:"In this they are to make a type of specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips.en the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
    },
]