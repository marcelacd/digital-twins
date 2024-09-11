import route from './route.js'
import heatMapData from './heatmapData.js'

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMWQ0NjcwZi1mYTY2LTRhYzEtOWM1NS0wOTc4YjA3MjM3ZjIiLCJpZCI6MTczMzQ5LCJpYXQiOjE2OTgwNTE5NzJ9.y-PuQVtDcv_MxaYk-k0IL0oiWX0Dwk4KNywLq73UiFQ';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
var viewer;
let globe;

const zonas = [
    {
        coordinates: [
            [4.57857238, -74.07002398],
            [4.572198, -74.0841044],
            [4.59227386, -74.08473648],
            [4.60417137, -74.08252418],
            [4.59117823, -74.06526988],
            [4.58953764, -74.06389018],
            [4.58446341, -74.06551042],
            [4.58144974, -74.06720025],
            [4.57857238, -74.07002398],
        ],
        color: Cesium.Color.ORANGE,
        height: 120,
        id: 'zona1'
    },
    {
        coordinates: [
            [4.695293510659002, -74.0933481566148],
            [4.696218869902729, -74.09882759346124],
            [4.697561768882284, -74.05930890866813],
            [4.6711834278454535, -74.04158436440516],
            [4.6611834278454535, -74.06158436440516],
        ],
        color: Cesium.Color.PURPLE,
        height: 100,
        id: 'zona2'
    }
]

const zona1 =
{
    coordinates: [
        [4.57857238, -74.07002398],
        [4.572198, -74.0841044],
        [4.59227386, -74.08473648],
        [4.60417137, -74.08252418],
        [4.59117823, -74.06526988],
        [4.58953764, -74.06389018],
        [4.58446341, -74.06551042],
        [4.58144974, -74.06720025],
        [4.57857238, -74.07002398],
    ],
    color: Cesium.Color.GREEN,
    height: 100
}

const zona2 =
{
    coordinates: [
        [4.695293510659002, -74.0933481566148],
        [4.696218869902729, -74.09882759346124],
        [4.697561768882284, -74.05930890866813],
        [4.6711834278454535, -74.04158436440516],
        [4.6611834278454535, -74.06158436440516],
    ],
    color: Cesium.Color.ORANGE,
    height: 40
}

const clientes1 = [
    [
        4.58848664,
        -74.06619835,
        "Cliente 1"
    ],
    [
        4.58231326,
        -74.07743207,
        "Cliente 2"
    ],
    [
        4.59053444,
        -74.08251413,
        "Cliente 3"
    ],
    [
        4.58377846,
        -74.06811697,
        "Cliente 4"
    ],
    [
        4.58904915,
        -74.0656668,
        "Cliente 5"
    ],
    [
        4.5829361,
        -74.06718058,
        "Cliente 6"
    ],
    [
        4.589368,
        -74.078319,
        "Cliente 7"
    ],
    [
        4.5830917,
        -74.07117823,
        "Cliente 8"
    ],
    [
        4.58633079,
        -74.06622153,
        "Cliente 9"
    ],
    [
        4.579158,
        -74.075439,
        "Cliente 10"
    ],
    [
        4.5807674,
        -74.07204512,
        "Cliente 11"
    ],
    [
        4.58658157,
        -74.07147529,
        "Cliente 12"
    ],
    [
        4.588739,
        -74.07711076,
        "Cliente 13"
    ],
    [
        4.58268694,
        -74.0780264,
        "Cliente 14"
    ],
    [
        4.58901829,
        -74.06674229,
        "Cliente 15"
    ],
    [
        4.58564653,
        -74.06751596,
        "Cliente 16"
    ],
    [
        4.59161575,
        -74.07313852,
        "Cliente 17"
    ],
    [
        4.592266,
        -74.07470987,
        "Cliente 18"
    ],
    [
        4.58213001,
        -74.06848389,
        "Cliente 19"
    ],
    [
        4.58609056,
        -74.07159433,
        "Cliente 20"
    ],
    [
        4.59052517,
        -74.07599942,
        "Cliente 21"
    ],
    [
        4.58944148,
        -74.07677689,
        "Cliente 22"
    ],
    [
        4.57932551,
        -74.07209258,
        "Cliente 23"
    ],
    [
        4.58347295,
        -74.0764031,
        "Cliente 24"
    ],
    [
        4.5811298,
        -74.06898635,
        "Cliente 25"
    ],
    [
        4.58147184,
        -74.0754251,
        "Cliente 26"
    ],
    [
        4.58508656,
        -74.07457358,
        "Cliente 27"
    ],
    [
        4.58257054,
        -74.07533186,
        "Cliente 28"
    ],
    [
        4.582276,
        -74.07524294,
        "Cliente 29"
    ],
    [
        4.58112727,
        -74.07664864,
        "Cliente 30"
    ],
    [
        4.58273318,
        -74.07639364,
        "Cliente 31"
    ],
    [
        4.58524506,
        -74.07462434,
        "Cliente 32"
    ],
    [
        4.58701938,
        -74.07562712,
        "Cliente 33"
    ],
    [
        4.58690125,
        -74.07559139,
        "Cliente 34"
    ],
    [
        4.58599943,
        -74.07720159,
        "Cliente 35"
    ],
    [
        4.58836994,
        -74.07129619,
        "Cliente 36"
    ],
    [
        4.58763748,
        -74.07249912,
        "Cliente 37"
    ],
    [
        4.5913613,
        -74.07279123,
        "Cliente 38"
    ],
    [
        4.58984899,
        -74.07334954,
        "Cliente 39"
    ],
    [
        4.59051469,
        -74.0728281,
        "Cliente 40"
    ],
    [
        4.58867918,
        -74.07227073,
        "Cliente 41"
    ],
    [
        4.58718166,
        -74.07141771,
        "Cliente 42"
    ],
    [
        4.58775045,
        -74.07353674,
        "Cliente 43"
    ],
    [
        4.58829733,
        -74.07297546,
        "Cliente 44"
    ],
    [
        4.58893524,
        -74.07223153,
        "Cliente 45"
    ],
    [
        4.58977321,
        -74.07393385,
        "Cliente 46"
    ],
    [
        4.58896973,
        -74.07234219,
        "Cliente 47"
    ],
    [
        4.58757166,
        -74.0737085,
        "Cliente 48"
    ],
    [
        4.58982636,
        -74.0732084,
        "Cliente 49"
    ],
    [
        4.5849527,
        -74.07985887,
        "Cliente 50"
    ],
    [
        4.5870665,
        -74.07988648,
        "Cliente 51"
    ],
    [
        4.58943042,
        -74.07828624,
        "Cliente 52"
    ],
    [
        4.586265,
        -74.080806,
        "Cliente 53"
    ],
    [
        4.5862204,
        -74.080898,
        "Cliente 54"
    ],
    [
        4.59090829,
        -74.07826535,
        "Cliente 55"
    ],
    [
        4.5914923,
        -74.06650702,
        "Cliente 56"
    ],
    [
        4.58852001,
        -74.06616999,
        "Cliente 57"
    ],
    [
        4.5844466,
        -74.06667543,
        "Cliente 58"
    ],
    [
        4.58374852,
        -74.06672685,
        "Cliente 59"
    ],
    [
        4.58590386,
        -74.06736295,
        "Cliente 60"
    ],
    [
        4.58856785,
        -74.06773613,
        "Cliente 61"
    ],
    [
        4.58734692,
        -74.06872308,
        "Cliente 62"
    ],
    [
        4.58827326,
        -74.06685142,
        "Cliente 63"
    ],
    [
        4.5897707,
        -74.06880057,
        "Cliente 64"
    ],
    [
        4.58978997,
        -74.06897373,
        "Cliente 65"
    ],
    [
        4.58905807,
        -74.06809325,
        "Cliente 66"
    ],
    [
        4.58807666,
        -74.07044245,
        "Cliente 67"
    ],
    [
        4.58865581,
        -74.06907971,
        "Cliente 68"
    ],
    [
        4.58989374,
        -74.0690998,
        "Cliente 69"
    ],
    [
        4.59013798,
        -74.07040543,
        "Cliente 70"
    ],
    [
        4.59034691,
        -74.07130402,
        "Cliente 71"
    ],
    [
        4.579006,
        -74.070574,
        "Cliente 72"
    ],
    [
        4.58197042,
        -74.06954334,
        "Cliente 73"
    ],
    [
        4.58144974,
        -74.06720025,
        "Cliente 74"
    ],
    [
        4.58321354,
        -74.06864675,
        "Cliente 75"
    ],
    [
        4.58100782,
        -74.07128058,
        "Cliente 76"
    ],
    [
        4.58177305,
        -74.07116016,
        "Cliente 77"
    ],
    [
        4.58190653,
        -74.0725599,
        "Cliente 78"
    ],
    [
        4.5803525,
        -74.07243657,
        "Cliente 79"
    ],
    [
        4.58341103,
        -74.07163274,
        "Cliente 80"
    ],
    [
        4.58178508,
        -74.07220305,
        "Cliente 81"
    ],
    [
        4.58417306,
        -74.07245089,
        "Cliente 82"
    ],
    [
        4.58571616,
        -74.07198555,
        "Cliente 83"
    ],
    [
        4.58557034,
        -74.07452378,
        "Cliente 84"
    ],
    [
        4.58666103,
        -74.07426331,
        "Cliente 85"
    ],
    [
        4.58351814,
        -74.06652945,
        "Cliente 86"
    ],
    [
        4.5876368,
        -74.06968695,
        "Cliente 87"
    ],
    [
        4.58482773,
        -74.07184679,
        "Cliente 88"
    ],
    [
        4.58498128,
        -74.06756245,
        "Cliente 89"
    ],
    [
        4.58293856,
        -74.07722327,
        "Cliente 90"
    ],
    [
        4.58325026,
        -74.07756783,
        "Cliente 91"
    ],
    [
        4.58917713,
        -74.06574516,
        "Cliente 92"
    ],
    [
        4.58949608,
        -74.06665095,
        "Cliente 93"
    ],
    [
        4.5830136,
        -74.06982361,
        "Cliente 94"
    ],
    [
        4.58587267,
        -74.06858949,
        "Cliente 95"
    ],
    [
        4.58360763,
        -74.07142879,
        "Cliente 96"
    ],
    [
        4.588329,
        -74.0668891,
        "Cliente 97"
    ],
    [
        4.59213989,
        -74.07407126,
        "Cliente 98"
    ],
    [
        4.58962644,
        -74.06974157,
        "Cliente 99"
    ],
    [
        4.59001031,
        -74.06722749,
        "Cliente 100"
    ],
    [
        4.59109904,
        -74.06849654,
        "Cliente 101"
    ],
    [
        4.59049652,
        -74.06757466,
        "Cliente 102"
    ],
    [
        4.58750764,
        -74.07406917,
        "Cliente 103"
    ],
    [
        4.58233894,
        -74.06754329,
        "Cliente 104"
    ],
    [
        4.58043737,
        -74.07183484,
        "Cliente 105"
    ],
    [
        4.59209943,
        -74.07400947,
        "Cliente 106"
    ],
    [
        4.5853508,
        -74.07009779,
        "Cliente 107"
    ],
    [
        4.58090838,
        -74.07007022,
        "Cliente 108"
    ],
    [
        4.58473798,
        -74.07168397,
        "Cliente 109"
    ],
    [
        4.58959839,
        -74.07353876,
        "Cliente 110"
    ],
    [
        4.58145427,
        -74.07722199,
        "Cliente 111"
    ],
    [
        4.58045038,
        -74.07314639,
        "Cliente 112"
    ],
    [
        4.59162747,
        -74.06704089,
        "Cliente 113"
    ],
    [
        4.59132117,
        -74.07269354,
        "Cliente 114"
    ],
    [
        4.58287,
        -74.07281,
        "Cliente 115"
    ],
    [
        4.59077594,
        -74.07482302,
        "Cliente 116"
    ],
    [
        4.58192112,
        -74.0720065,
        "Cliente 117"
    ],
    [
        4.58578341,
        -74.07693563,
        "Cliente 118"
    ],
    [
        4.58506812,
        -74.07743518,
        "Cliente 119"
    ],
    [
        4.5810791,
        -74.06934638,
        "Cliente 120"
    ],
    [
        4.586265,
        -74.080807,
        "Cliente 121"
    ],
    [
        4.5868436,
        -74.07878646,
        "Cliente 122"
    ],
    [
        4.58521352,
        -74.06800413,
        "Cliente 123"
    ],
    [
        4.59227386,
        -74.08473648,
        "Cliente 124"
    ],
    [
        4.58999367,
        -74.07008223,
        "Cliente 125"
    ],
    [
        4.587783,
        -74.07715226,
        "Cliente 126"
    ],
    [
        4.5874727,
        -74.07623743,
        "Cliente 127"
    ],
    [
        4.58526907,
        -74.07827663,
        "Cliente 128"
    ],
    [
        4.584744,
        -74.06653,
        "Cliente 129"
    ],
    [
        4.58175911,
        -74.07098073,
        "Cliente 130"
    ],
    [
        4.58254344,
        -74.07788883,
        "Cliente 131"
    ],
    [
        4.5811,
        -74.078067,
        "Cliente 132"
    ],
    [
        4.59218314,
        -74.07425754,
        "Cliente 133"
    ],
    [
        4.58333496,
        -74.0680412,
        "Cliente 134"
    ],
    [
        4.58953764,
        -74.06389018,
        "Cliente 135"
    ],
    [
        4.58123944,
        -74.07085235,
        "Cliente 136"
    ],
    [
        4.58171994,
        -74.07545098,
        "Cliente 137"
    ],
    [
        4.58725598,
        -74.07794909,
        "Cliente 138"
    ],
    [
        4.58101379,
        -74.07688542,
        "Cliente 139"
    ],
    [
        4.5879132,
        -74.076298,
        "Cliente 140"
    ],
    [
        4.58179108,
        -74.07559709,
        "Cliente 141"
    ],
    [
        4.58435072,
        -74.06873624,
        "Cliente 142"
    ],
    [
        4.58951794,
        -74.07747489,
        "Cliente 143"
    ],
    [
        4.581602,
        -74.07508127,
        "Cliente 144"
    ],
    [
        4.58446341,
        -74.06551042,
        "Cliente 145"
    ],
    [
        4.5930387,
        -74.06967716,
        "Cliente 146"
    ],
    [
        4.584265,
        -74.07251,
        "Cliente 147"
    ],
    [
        4.58378845,
        -74.06960965,
        "Cliente 148"
    ],
    [
        4.58638412,
        -74.07442442,
        "Cliente 149"
    ],
    [
        4.5824729,
        -74.07634496,
        "Cliente 150"
    ],
    [
        4.5825342,
        -74.07587276,
        "Cliente 151"
    ],
    [
        4.60013898,
        -74.08003035,
        "Cliente 152"
    ],
    [
        4.58479714,
        -74.06957089,
        "Cliente 153"
    ],
    [
        4.60417137,
        -74.08252418,
        "Cliente 154"
    ],
    [
        4.58998134,
        -74.06950927,
        "Cliente 155"
    ],
    [
        4.58312263,
        -74.07644061,
        "Cliente 156"
    ],
    [
        4.58440594,
        -74.07539984,
        "Cliente 157"
    ],
    [
        4.59308112,
        -74.06966358,
        "Cliente 158"
    ],
    [
        4.58862116,
        -74.07714387,
        "Cliente 159"
    ],
    [
        4.58292436,
        -74.07109811,
        "Cliente 160"
    ],
    [
        4.58932234,
        -74.07722876,
        "Cliente 161"
    ],
    [
        4.5857878,
        -74.07184429,
        "Cliente 162"
    ],
    [
        4.58743083,
        -74.07600716,
        "Cliente 163"
    ],
    [
        4.58621836,
        -74.06812875,
        "Cliente 164"
    ],
    [
        4.58528189,
        -74.07003929,
        "Cliente 165"
    ],
    [
        4.59014323,
        -74.07994396,
        "Cliente 166"
    ],
    [
        4.59194303,
        -74.0739539,
        "Cliente 167"
    ],
    [
        4.59205674,
        -74.07421491,
        "Cliente 168"
    ],
    [
        4.59163737,
        -74.07335202,
        "Cliente 169"
    ],
    [
        4.58060656,
        -74.06918976,
        "Cliente 170"
    ],
    [
        4.58638411,
        -74.08078821,
        "Cliente 171"
    ],
    [
        4.58277736,
        -74.07733275,
        "Cliente 172"
    ],
    [
        4.579748,
        -74.075482,
        "Cliente 173"
    ],
    [
        4.58124878,
        -74.06769871,
        "Cliente 174"
    ],
    [
        4.59157946,
        -74.07305998,
        "Cliente 175"
    ],
    [
        4.58206151,
        -74.07661422,
        "Cliente 176"
    ],
    [
        4.58972301,
        -74.0706299,
        "Cliente 177"
    ],
    [
        4.58278808,
        -74.0781204,
        "Cliente 178"
    ],
    [
        4.58035329,
        -74.07185438,
        "Cliente 179"
    ],
    [
        4.59072383,
        -74.07125793,
        "Cliente 180"
    ],
    [
        4.58671539,
        -74.07382865,
        "Cliente 181"
    ],
    [
        4.584982,
        -74.080352,
        "Cliente 182"
    ],
    [
        4.58367012,
        -74.07653358,
        "Cliente 183"
    ],
    [
        4.5884457,
        -74.07086903,
        "Cliente 184"
    ],
    [
        4.59109045,
        -74.07560771,
        "Cliente 185"
    ],
    [
        4.58376374,
        -74.06821305,
        "Cliente 186"
    ],
    [
        4.58009943,
        -74.07043103,
        "Cliente 187"
    ],
    [
        4.58514313,
        -74.06756731,
        "Cliente 188"
    ],
    [
        4.58272968,
        -74.07806662,
        "Cliente 189"
    ],
    [
        4.58043384,
        -74.07140103,
        "Cliente 190"
    ],
    [
        4.58584371,
        -74.07165211,
        "Cliente 191"
    ],
    [
        4.58470856,
        -74.06786364,
        "Cliente 192"
    ],
    [
        4.58453161,
        -74.06654189,
        "Cliente 193"
    ],
    [
        4.58837307,
        -74.06642988,
        "Cliente 194"
    ],
    [
        4.58498938,
        -74.07764007,
        "Cliente 195"
    ],
    [
        4.58811663,
        -74.07621463,
        "Cliente 196"
    ],
    [
        4.59195276,
        -74.07382825,
        "Cliente 197"
    ],
    [
        4.58233133,
        -74.0760595,
        "Cliente 198"
    ],
    [
        4.5803575,
        -74.07176959,
        "Cliente 199"
    ],
    [
        4.59221068,
        -74.07460437,
        "Cliente 200"
    ],
    [
        4.58699963,
        -74.07198162,
        "Cliente 201"
    ],
    [
        4.58209427,
        -74.0786773,
        "Cliente 202"
    ],
    [
        4.59125938,
        -74.07212459,
        "Cliente 203"
    ],
    [
        4.58098056,
        -74.07183865,
        "Cliente 204"
    ],
    [
        4.58094976,
        -74.07064881,
        "Cliente 205"
    ],
    [
        4.58075062,
        -74.07196711,
        "Cliente 206"
    ],
    [
        4.58938607,
        -74.07349295,
        "Cliente 207"
    ],
    [
        4.58379999,
        -74.06961001,
        "Cliente 208"
    ],
    [
        4.58823758,
        -74.07082732,
        "Cliente 209"
    ],
    [
        4.5873176,
        -74.07763512,
        "Cliente 210"
    ],
    [
        4.59274752,
        -74.06945133,
        "Cliente 211"
    ],
    [
        4.5824275,
        -74.07651097,
        "Cliente 212"
    ],
    [
        4.58594002,
        -74.07148999,
        "Cliente 213"
    ],
    [
        4.59143181,
        -74.07069982,
        "Cliente 214"
    ],
    [
        4.58080454,
        -74.07080448,
        "Cliente 215"
    ],
    [
        4.58080467,
        -74.07070534,
        "Cliente 216"
    ],
    [
        4.59292496,
        -74.06965671,
        "Cliente 217"
    ],
    [
        4.58289209,
        -74.06927423,
        "Cliente 218"
    ],
    [
        4.58019497,
        -74.07326164,
        "Cliente 219"
    ],
    [
        4.58651988,
        -74.0746944,
        "Cliente 220"
    ],
    [
        4.58705421,
        -74.06851303,
        "Cliente 221"
    ],
    [
        4.58610389,
        -74.06868778,
        "Cliente 222"
    ],
    [
        4.58258844,
        -74.07793244,
        "Cliente 223"
    ],
    [
        4.58944727,
        -74.07732141,
        "Cliente 224"
    ],
    [
        4.59143436,
        -74.06611832,
        "Cliente 225"
    ],
    [
        4.58950521,
        -74.0664056,
        "Cliente 226"
    ],
    [
        4.58725486,
        -74.0826145,
        "Cliente 227"
    ],
    [
        4.59183187,
        -74.06737556,
        "Cliente 228"
    ],
    [
        4.581283,
        -74.076413,
        "Cliente 229"
    ],
    [
        4.582742,
        -74.078851,
        "Cliente 230"
    ],
    [
        4.59060707,
        -74.07070511,
        "Cliente 231"
    ],
    [
        4.58350976,
        -74.06865845,
        "Cliente 232"
    ],
    [
        4.57857238,
        -74.07002398,
        "Cliente 233"
    ],
    [
        4.5893204,
        -74.07047353,
        "Cliente 234"
    ],
    [
        4.58785343,
        -74.07059462,
        "Cliente 235"
    ],
    [
        4.58269,
        -74.078798,
        "Cliente 236"
    ],
    [
        4.59035824,
        -74.06990006,
        "Cliente 237"
    ],
    [
        4.59073245,
        -74.0734422,
        "Cliente 238"
    ],
    [
        4.584412,
        -74.068038,
        "Cliente 239"
    ],
    [
        4.58579275,
        -74.07170119,
        "Cliente 240"
    ],
    [
        4.58184171,
        -74.07091471,
        "Cliente 241"
    ],
    [
        4.583651,
        -74.069862,
        "Cliente 242"
    ],
    [
        4.58015821,
        -74.07156448,
        "Cliente 243"
    ],
    [
        4.58256512,
        -74.07859388,
        "Cliente 244"
    ],
    [
        4.59227832,
        -74.07037619,
        "Cliente 245"
    ],
    [
        4.5860292,
        -74.07705366,
        "Cliente 246"
    ],
    [
        4.58838812,
        -74.06669888,
        "Cliente 247"
    ],
    [
        4.585694,
        -74.074369,
        "Cliente 248"
    ],
    [
        4.59078089,
        -74.07111532,
        "Cliente 249"
    ],
    [
        4.5861233,
        -74.07148095,
        "Cliente 250"
    ],
    [
        4.581177,
        -74.078162,
        "Cliente 251"
    ],
    [
        4.58891441,
        -74.0706656,
        "Cliente 252"
    ],
    [
        4.58386422,
        -74.07172554,
        "Cliente 253"
    ],
    [
        4.58623679,
        -74.07144005,
        "Cliente 254"
    ],
    [
        4.58541942,
        -74.07447653,
        "Cliente 255"
    ],
    [
        4.59060876,
        -74.07419646,
        "Cliente 256"
    ],
    [
        4.58778664,
        -74.07417417,
        "Cliente 257"
    ],
    [
        4.586294,
        -74.07151773,
        "Cliente 258"
    ],
    [
        4.578431,
        -74.073884,
        "Cliente 259"
    ],
    [
        4.58239,
        -74.078795,
        "Cliente 260"
    ],
    [
        4.58276929,
        -74.07119014,
        "Cliente 261"
    ],
    [
        4.58599237,
        -74.06738509,
        "Cliente 262"
    ],
    [
        4.58288461,
        -74.07128633,
        "Cliente 263"
    ],
    [
        4.58362342,
        -74.0697881,
        "Cliente 264"
    ],
    [
        4.58183955,
        -74.0766274,
        "Cliente 265"
    ],
    [
        4.5854546,
        -74.06795931,
        "Cliente 266"
    ],
    [
        4.58581498,
        -74.07435811,
        "Cliente 267"
    ],
    [
        4.58213169,
        -74.06825346,
        "Cliente 268"
    ],
    [
        4.58421156,
        -74.06897415,
        "Cliente 269"
    ],
    [
        4.58128926,
        -74.06965597,
        "Cliente 270"
    ],
    [
        4.58526524,
        -74.07749549,
        "Cliente 271"
    ],
    [
        4.5889717,
        -74.07699178,
        "Cliente 272"
    ],
    [
        4.59083999,
        -74.07106,
        "Cliente 273"
    ],
    [
        4.59047707,
        -74.07218207,
        "Cliente 274"
    ],
    [
        4.58610104,
        -74.06801369,
        "Cliente 275"
    ],
    [
        4.58183033,
        -74.07250094,
        "Cliente 276"
    ],
    [
        4.59136574,
        -74.06630797,
        "Cliente 277"
    ],
    [
        4.58941327,
        -74.07256106,
        "Cliente 278"
    ],
    [
        4.59032402,
        -74.06987169,
        "Cliente 279"
    ],
    [
        4.58582122,
        -74.07186178,
        "Cliente 280"
    ],
    [
        4.58053965,
        -74.06928482,
        "Cliente 281"
    ],
    [
        4.58634994,
        -74.07454954,
        "Cliente 282"
    ],
    [
        4.58920974,
        -74.07278358,
        "Cliente 283"
    ],
    [
        4.58703661,
        -74.07983412,
        "Cliente 284"
    ],
    [
        4.58117992,
        -74.07824438,
        "Cliente 285"
    ],
    [
        4.57998907,
        -74.06968582,
        "Cliente 286"
    ],
    [
        4.586553,
        -74.080794,
        "Cliente 287"
    ],
    [
        4.5804042,
        -74.07146812,
        "Cliente 288"
    ],
    [
        4.58383625,
        -74.06842986,
        "Cliente 289"
    ],
    [
        4.58832002,
        -74.07013003,
        "Cliente 290"
    ],
    [
        4.58069251,
        -74.0753446,
        "Cliente 291"
    ],
    [
        4.59043394,
        -74.07126226,
        "Cliente 292"
    ],
    [
        4.58661023,
        -74.0741692,
        "Cliente 293"
    ],
    [
        4.5897391,
        -74.07114429,
        "Cliente 294"
    ],
    [
        4.5864161,
        -74.07729796,
        "Cliente 295"
    ],
    [
        4.58287,
        -74.072808,
        "Cliente 296"
    ],
    [
        4.58974469,
        -74.06893802,
        "Cliente 297"
    ],
    [
        4.58007307,
        -74.07037783,
        "Cliente 298"
    ],
    [
        4.58776053,
        -74.07267248,
        "Cliente 299"
    ],
    [
        4.58248998,
        -74.07799173,
        "Cliente 300"
    ],
    [
        4.59091471,
        -74.07141487,
        "Cliente 301"
    ],
    [
        4.58739335,
        -74.06870096,
        "Cliente 302"
    ],
    [
        4.58232847,
        -74.07784734,
        "Cliente 303"
    ],
    [
        4.58620838,
        -74.07154798,
        "Cliente 304"
    ],
    [
        4.58466839,
        -74.07863712,
        "Cliente 305"
    ],
    [
        4.58101083,
        -74.07054423,
        "Cliente 306"
    ],
    [
        4.58742461,
        -74.0759927,
        "Cliente 307"
    ],
    [
        4.58592817,
        -74.07377071,
        "Cliente 308"
    ],
    [
        4.58822882,
        -74.06987103,
        "Cliente 309"
    ],
    [
        4.57879971,
        -74.075666,
        "Cliente 310"
    ],
    [
        4.58712927,
        -74.07037128,
        "Cliente 311"
    ],
    [
        4.59124143,
        -74.07067413,
        "Cliente 312"
    ],
    [
        4.58398797,
        -74.07140333,
        "Cliente 313"
    ],
    [
        4.57954314,
        -74.07102501,
        "Cliente 314"
    ],
    [
        4.5817002,
        -74.07667598,
        "Cliente 315"
    ],
    [
        4.58998803,
        -74.07593978,
        "Cliente 316"
    ],
    [
        4.58218968,
        -74.06961788,
        "Cliente 317"
    ],
    [
        4.58219575,
        -74.0755977,
        "Cliente 318"
    ],
    [
        4.582027,
        -74.06716768,
        "Cliente 319"
    ],
    [
        4.58257435,
        -74.07595346,
        "Cliente 320"
    ],
    [
        4.59166451,
        -74.07324494,
        "Cliente 321"
    ],
    [
        4.58465117,
        -74.08019604,
        "Cliente 322"
    ],
    [
        4.58774346,
        -74.07312913,
        "Cliente 323"
    ],
    [
        4.5863826,
        -74.07138888,
        "Cliente 324"
    ],
    [
        4.58092442,
        -74.07069865,
        "Cliente 325"
    ],
    [
        4.585666,
        -74.076619,
        "Cliente 326"
    ],
    [
        4.59117823,
        -74.06526988,
        "Cliente 327"
    ],
    [
        4.58771231,
        -74.07710934,
        "Cliente 328"
    ],
    [
        4.58613944,
        -74.07412114,
        "Cliente 329"
    ],
    [
        4.58380186,
        -74.07016142,
        "Cliente 330"
    ],
    [
        4.581283,
        -74.076412,
        "Cliente 331"
    ],
    [
        4.58216649,
        -74.07658507,
        "Cliente 332"
    ],
    [
        4.58721055,
        -74.07382807,
        "Cliente 333"
    ],
    [
        4.58017664,
        -74.07264138,
        "Cliente 334"
    ],
    [
        4.58480668,
        -74.07812961,
        "Cliente 335"
    ],
    [
        4.587635,
        -74.078406,
        "Cliente 336"
    ],
    [
        4.5885491,
        -74.07716114,
        "Cliente 337"
    ],
    [
        4.581128,
        -74.068942,
        "Cliente 338"
    ],
    [
        4.58925785,
        -74.06996571,
        "Cliente 339"
    ],
    [
        4.58073467,
        -74.07100205,
        "Cliente 340"
    ],
    [
        4.591409,
        -74.072746,
        "Cliente 341"
    ],
    [
        4.582813,
        -74.070356,
        "Cliente 342"
    ],
    [
        4.58409111,
        -74.06851736,
        "Cliente 343"
    ],
    [
        4.581054,
        -74.070514,
        "Cliente 344"
    ],
    [
        4.58639121,
        -74.07148943,
        "Cliente 345"
    ],
    [
        4.58068112,
        -74.07200072,
        "Cliente 346"
    ],
    [
        4.59024201,
        -74.06986359,
        "Cliente 347"
    ],
    [
        4.59109941,
        -74.06863907,
        "Cliente 348"
    ],
    [
        4.58659372,
        -74.0773721,
        "Cliente 349"
    ],
    [
        4.58501802,
        -74.06961462,
        "Cliente 350"
    ],
    [
        4.589244,
        -74.066521,
        "Cliente 351"
    ],
    [
        4.582417,
        -74.077563,
        "Cliente 352"
    ],
    [
        4.5912,
        -74.0686,
        "Cliente 353"
    ],
    [
        4.58535914,
        -74.0774272,
        "Cliente 354"
    ],
    [
        4.582091,
        -74.078626,
        "Cliente 355"
    ],
    [
        4.58632735,
        -74.07140698,
        "Cliente 356"
    ],
    [
        4.5837279,
        -74.07705785,
        "Cliente 357"
    ],
    [
        4.57219800,
        -74.0841044,
        "Cliente 358"
    ]
]

const clientes2 = [
    [
        4.695293510659002,
        -74.0933481566148,
        "Cliente 1"
    ],
    [
        4.6711834278454535,
        -74.04158436440516,
        "Cliente 2"
    ]
]

// Oyente del padre
window.addEventListener('message', (event) => {
    var interval;
    clearInterval(interval)
    const data = event.data;

    switch (data.type) {
        case 'navZona1':
            flyToLocation(-74.0841044, 4.57219800, 2904.178188038059, 4.360248260903442, -42.55796094369222, "", 8)
            break;
        case 'clientes1':
            addClients(clientes1, 'clientes1')
            break;
        case 'navZona2':
            flyToLocation(-74.04158436440516, 4.6711834278454535, 2904.178188038059, 4.360248260903442, -42.55796094369222, "", 8)
            break;
        case 'clientes2':
            addClients(clientes2, 'clientes2')
            break;

        case 'billboard':
            addBillboardWithGuideline(-74.10649740060114, 4.604822960572272, 2650, "assets/icons/warning.png", "Alert", "billboard")
            flyToLocation(-74.10753627935567, 4.6021693827515575, 2904.178188038059, 4.360248260903442, -42.55796094369222, "", 8)
            break;
        case 'heatmap':
            flyToLocation(-74.09604840545734, 4.67266889349088, 3039.1739047750702, 16.973625630440463, -69.91310993745206, "", 8)
            addHeatMap(heatMapData.extent, heatMapData.data, 100, 'heatmap')
            break;
        case 'delete':
            removeEntities(data.value);
            break;
        default:
            break;
    }
});

// Enviar mensaje a los padres
function sendMessageToParent(message) {
    console.log(message)
    window.parent.postMessage(message, '*');
}

// Enviar mensaje a cesium
function sendMessageToCesium(message) {
    console.log(message)
    window.postMessage(message, '*');
}

try {
    //Configuracion vista cesium
    viewer = new Cesium.Viewer("cesiumContainer", {
        // terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
        requestVertexNormals: true,
        animation: true,
        vrButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        navigationHelpButton: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        timeline: false,  // Ocultar la barra de tiempo
        animation: false,  // Ocultar los controles de animación
    });

    var element = document.getElementById('cesiumContainer');
    viewer.cesiumWidget.creditContainer.style.display = 'none'; //Ocultar letrero cesium

    //Restringir la distancia del zoom en metros
    // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 300;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000
    viewer.forceResize();

    // const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
    // const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    // viewer.scene.primitives.add(tileset);

    globe = viewer.scene.globe;
    globe.depthTestAgainstTerrain = true;


    // Crear el div del tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    document.body.appendChild(tooltip);

    // Estilos para el tooltip
    tooltip.style.display = 'none';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#0b2c1fd4';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '20%';
    tooltip.style.fontWeight = '600'

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // Controlador de la acción de clic izquierdo
    handler.setInputAction(function (click) {
        var pickedObject = viewer.scene.pick(click.position)

        if (pickedObject && pickedObject.id && pickedObject?.id?.idname) {
            console.log(pickedObject.id)
            sendMessageToParent({ type: 'zonaSelected', value: pickedObject.id.idname });
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // Controlador de la acción de hacer clic con el botón derecho
    const points = [];
    handler.setInputAction(function (click) {
        var cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            points.push([latitude, longitude])
            console.log(points);
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // Controlador de la acción de mover el ratón
    handler.setInputAction(function (movement) {
        var pickedObject = viewer.scene.pick(movement.endPosition);
        console.log(pickedObject)
        if (Cesium.defined(pickedObject) && (pickedObject.id)) {
            viewer.scene.canvas.style.cursor = 'pointer';
        } else {
            viewer.scene.canvas.style.cursor = 'default';
        }
        if (Cesium.defined(pickedObject) && (pickedObject.id) && (pickedObject.id.clientName)) {
            // Estilos del tooltip
            element.style.cursor = 'pointer';
            tooltip.style.display = 'flex';
            tooltip.style.flexDirection = 'row';
            tooltip.style.alignItems = 'center';
            tooltip.style.gap = '10px';
            tooltip.style.color = 'rgba(255, 255, 255, 0.817)';
            tooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            tooltip.style.border = `1px solid #ccc`;
            tooltip.style.borderRadius = '1rem';
            // if (pickedObject.id._name === 'circle') {
            tooltip.style.color = 'black';
            tooltip.style.border = `1px solid black`;
            tooltip.innerHTML = pickedObject.id.clientName;
            // }

            // Obtiene las coordenadas para colocar el tooltip
            var x = movement.endPosition.x;
            var y = movement.endPosition.y;
            // Configuración de la posición del tooltip
            tooltip.style.left = (x + 10) + 'px';
            tooltip.style.top = (y - 30) + 'px';

        } else {
            element.style.cursor = 'default';
            tooltip.style.display = 'none';
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

} catch (error) {
    console.log(error);
}

// pintar las zonas al inicializar el mapa
addPolygon(zonas)

// Volar camera donde estan las zonas en Bogotá
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-74.10434711548491, 4.496000000008532, 7814.439181102958),
    // duration: 10,
    orientation: {
        heading: Cesium.Math.toRadians(352.06083567832485), // Dirección hacia donde vuela
        pitch: Cesium.Math.toRadians(-71.05209883685313), // Durante el vuelo, mira directamente hacia abajo
    },
    complete: () => {
        viewer.camera.flyTo({
            destination: viewer.camera.position, // Mantenemos la posición actual
            // duration: 3,
            orientation: {
                heading: Cesium.Math.toRadians(352.06083567832485),
                pitch: Cesium.Math.toRadians(-30), // Inclinación final a -30 grados
            }
        })
    }
})

// Volar a un lugar determinado
function flyToLocation(lon, lat, height, heading, pitch, name, duration = 0) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        // duration: duration,
        complete: () => {
            sendMessageToCesium({ type: 'flyToCompleted', value: name });
        },
        orientation: {
            heading: Cesium.Math.toRadians(heading),
            pitch: Cesium.Math.toRadians(pitch),
        }
    });
}

// Añadir polígonos para cada zona
function addPolygon(zonee) {
    // console.log(zone.coordinates)
    // const positions = zone.coordinates.map(function (coord) {
    //     return Cesium.Cartesian3.fromDegrees(coord[1], coord[0]);
    // });

    // const polygon = viewer.entities.add({
    //     name: name,
    //     polygon: {
    //         hierarchy: new Cesium.PolygonHierarchy(positions),
    //         outline: false,
    //         material: zone.color.withAlpha(0.5),
    //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //         extrudedHeight: zone.height,
    //         disableDepthTestDistance: Number.POSITIVE_INFINITY
    //     },
    // });
    zonee.forEach(function (zone) {
        // Convertir las coordenadas de latitud y longitud a Cesium.Cartesian3
        const positions = zone.coordinates.map(function (coord) {
            return Cesium.Cartesian3.fromDegrees(coord[1], coord[0]);
        });

        // Agregar la nueva entidad y almacenar la referencia
        const entity = viewer.entities.add({
            name: 'zona',
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(positions),
                outline: false,
                // outlineColor: zone.color, // Cambia el color del contorno aquí
                // outlineWidth: 2, // Ancho del contorno
                material: zone.color.withAlpha(0.5),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                extrudedHeight: zone.height,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            idname: zone.id
        })
    })
}

//Añadir puntos de geolocalización para los clientes
function addClients(clients, type) {
    clients.forEach(function (coord) {
        viewer.entities.add({
            // name: coord[2],
            position: Cesium.Cartesian3.fromDegrees(coord[1], coord[0]), // Invierte los valores a (longitud, latitud)
            point: {
                pixelSize: 10,
                color: Cesium.Color.BLUE,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
            },
            clientName: coord[2], // Guardamos el nombre del cliente
            type: type
        })
    })
}

// Eliminar entidades por tipo
function removeEntities(type) {
    const entitiesToRemove = []
    console.log(type)
    viewer.entities.values.forEach(entity => {
        console.log(entity)
        if (entity.type === type) {
            entitiesToRemove.push(entity)
        }
    })
    entitiesToRemove.forEach(item => {
        viewer.entities.remove(item)
    })
}

// consola registra la posición de la cámara (long lat) y la rotación en movimiento
viewer.camera.moveStart.addEventListener(function () {
    const position = viewer.camera.positionCartographic;
    const longitude = Cesium.Math.toDegrees(position.longitude);
    const latitude = Cesium.Math.toDegrees(position.latitude);
    const height = position.height;
    const heading = Cesium.Math.toDegrees(viewer.camera.heading);
    const pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
    // console.log(longitude, latitude, height, heading, pitch);
});

// Obtener un color diferente en función del valor
function getColorByValue(value, opacity) {
    // Asegurémonos de que el valor esté en el rango de 0 a 100
    value = Math.min(Math.max(value, 0), 40);

    let red, green;

    if (value < 50) {
        // En la primera mitad del rango (0-49), vamos de verde a naranja
        red = Math.floor(255 * (50 - value) / 50);
        green = 255;
    } else {
        // En la segunda mitad del rango (50-100), vamos de naranja a rojo
        red = 255;
        green = Math.floor(255 * (100 - value) / 50);
    }

    // Construimos el color en formato RGB
    const color = `rgb(${red}, ${green}, 0, ${opacity})`;

    const cesiumColor = Cesium.Color.fromCssColorString(color);
    return cesiumColor;
}

// Añadir una entidad de imagen con una valla publicitaria y una directriz al suelo
function addBillboardWithGuideline(lon, lat, height, img, text = null, name = null) {
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    const bottomPosition = Cesium.Cartesian3.fromDegrees(lon, lat, 0);
    const billboard = viewer.entities.add({
        name: name,
        position: position,
        label: {
            font: '16pt sans-serif',
            text: text,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            fillColor: Cesium.Color.BLACK,
            showBackground: true,
            backgroundColor: Cesium.Color.WHITE.withAlpha(0.8),
            backgroundPadding: new Cesium.Cartesian2(10, 6),
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0.0, -50.0)
        },
        billboard: {
            image: img,
            show: true, // default
            scale: 0.4, // default: 1.0
            color: Cesium.Color.WHITE,
        },
        polyline: {
            positions: [position, bottomPosition],
            width: 2,
            material: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.RED,
                outlineWidth: 3,
                outlineColor: Cesium.Color.WHITE,
            }),
        }
    });
}

// Add heatmap
function addHeatMap(extent, data, radius, id) {

    console.log(data)
    // init heatmap
    let heatMap = CesiumHeatmap.create(
        viewer, // your cesium viewer
        extent, // bounds for heatmap layer
        {
            // heatmap.js options go here
            radius: radius,
            maxOpacity: 0.55,
            minOpacity: 0.2,
            blur: 0.85,
            gradient: {
                // enter n keys between 0 and 1 here
                // for gradient color customization
                '.0': 'blue',
                '.65': 'green',
                '.75': 'yellow',
                '.80': 'red'
            }
        },
        id
    );

    let valueMin = 0;
    let valueMax = 100;

    // add data to heatmap
    heatMap.setWGS84Data(valueMin, valueMax, data);
}



