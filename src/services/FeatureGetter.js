export default function FeatureGetter(features) {

    let uniqueKeys =  [
        "building",
        "landuse",
        "layer",
        "building:levels",
        "height",
        "public_transport",
        "train",
        "area",
        "covered",
        "level",
        "railway",
        "building:levels:underground",
        "leisure",
        "amenity",
        "highway",
        "shelter",
        "parking",
        "building:colour",
        "tourism",
        "healthcare",
        "sport",
        "building:part",
        "shop",
        "surface",
        "subway",
        "natural",
        "water",
        "bicycle_parking",
        "man_made",
        "historic",
        "barrier",
        "building:min_level",
        "station",
        "building:min_levels",
        "aeroway",
        "construction",
        "residential",
        "building:material",
        "electrified",
        "usage",
        "oneway",
        "bridge",
        "highspeed",
        "lanes",
        "oneway:bicycle",
        "passenger_lines",
        "railway:traffic_mode",
        "railway:track_ref",
        "tunnel",
        "lit",
        "bicycle",
        "foot",
        "embankment",
        "footway",
        "incline",
        "crossing",
        "fence_type",
        "conveying",
        "material",
        "wall",
        "platforms",
        "traffic_signals",
        "crossing:barrier",
        "crossing:bell",
        "crossing:light",
        "bus",
        "smoothness"
      ]

    features.forEach(element => {
        console.log('one element--')
        let propertiesObject = element['properties']

        uniqueKeys.forEach(k => {
            if (propertiesObject[k]) {
                console.log(`${k}: ${propertiesObject[k]}`)
            }
        })
       
    }); 
    
}