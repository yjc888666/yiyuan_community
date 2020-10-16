<template>
    <div class="box">
        <city-header></city-header>
        <city-sousuo :citymainList="citymainList"></city-sousuo>
        <city-main :citymainList="citymainList" :acindex="acindex"></city-main>
        <city-ol :citymainList="citymainList" @passindex="cindex" @passalpindex="huaindex"></city-ol>

    </div>
</template>

<script>
import cityHeader from '../city_components/cityheader.vue'
import cityMain from '../city_components/citymain.vue'
import cityOl from '../city_components/cityol.vue'
import citySousuo from '../city_components/citysousuo.vue'
import axios from 'axios'
export default {
    name: 'city',
    components: { cityHeader, cityMain, cityOl, citySousuo },
    data: function() {
        return {
            citymainList: {
                "hotCities": [
                    {
                        "id": 1,
                        "pinyin": "beijing",
                        "name": "北京"
                    },
                    {
                        "id": 10,
                        "pinyin": "shanghai",
                        "name": "上海"
                    },
                    {
                        "id": 42,
                        "pinyin": "xian",
                        "name": "西安"
                    },
                    {
                        "id": 111,
                        "pinyin": "sanya",
                        "name": "三亚"
                    },
                    {
                        "id": 334,
                        "pinyin": "lijiang",
                        "name": "丽江"
                    },
                    {
                        "id": 125,
                        "pinyin": "张家口",
                        "name": "张家口"
                    }
                ],
                "cities": {
                    "A": [{
                        "id": "150",
                        "name": "阿拉善",
                        "pinyin": "alashanmeng"
                    },
                    {
                        "id": "151",
                        "name": "鞍山",
                        "pinyin": "anshan"
                    },
                    {
                        "id": "197",
                        "name": "安庆",
                        "pinyin": "anqing"
                    },
                    {
                        "id": "238",
                        "name": "安阳",
                        "pinyin": "anyang"
                    },
                    {
                        "id": "319",
                        "name": "阿坝",
                        "pinyin": "aba"
                    },
                    {
                        "id": "324",
                        "name": "安顺",
                        "pinyin": "anshun"
                    },
                    {
                        "id": "350",
                        "name": "阿里",
                        "pinyin": "ali"
                    },
                    {
                        "id": "359",
                        "name": "安康",
                        "pinyin": "ankang"
                    },
                    {
                        "id": "394",
                        "name": "阿克苏",
                        "pinyin": "akesu"
                    },
                    {
                        "id": "400",
                        "name": "阿勒泰",
                        "pinyin": "aletai"
                    },
                    {
                        "id": "402",
                        "name": "澳门",
                        "pinyin": "aomen"
                    }
                    ],
                    "B": [
                        {
                            "id": "1",
                            "name": "北京",
                            "pinyin": "beijing"
                        },
                        {
                            "id": "84",
                            "name": "保定",
                            "pinyin": "baoding"
                        },
                        {
                            "id": "88",
                            "name": "蚌埠",
                            "pinyin": "bengbu"
                        },
                        {
                            "id": "140",
                            "name": "包头",
                            "pinyin": "baotou"
                        },
                        {
                            "id": "146",
                            "name": "巴彦淖尔",
                            "pinyin": "bayannaoer"
                        },
                        {
                            "id": "153",
                            "name": "本溪",
                            "pinyin": "benxi"
                        },
                        {
                            "id": "165",
                            "name": "白山",
                            "pinyin": "baishan"
                        },
                        {
                            "id": "167",
                            "name": "白城",
                            "pinyin": "baicheng"
                        },
                        {
                            "id": "204",
                            "name": "亳州",
                            "pinyin": "bozhou"
                        },
                        {
                            "id": "233",
                            "name": "滨州",
                            "pinyin": "binzhou"
                        },
                        {
                            "id": "292",
                            "name": "北海",
                            "pinyin": "beihai"
                        },
                        {
                            "id": "297",
                            "name": "百色",
                            "pinyin": "baise"
                        },
                        {
                            "id": "317",
                            "name": "巴中",
                            "pinyin": "bazhong"
                        },
                        {
                            "id": "327",
                            "name": "毕节",
                            "pinyin": "bijiediqu"
                        },
                        {
                            "id": "332",
                            "name": "保山",
                            "pinyin": "baoshan"
                        },
                        {
                            "id": "353",
                            "name": "宝鸡",
                            "pinyin": "baoji"
                        },
                        {
                            "id": "363",
                            "name": "白银",
                            "pinyin": "baiyin"
                        },
                        {
                            "id": "392",
                            "name": "博尔塔拉",
                            "pinyin": "boertala"
                        },
                        {
                            "id": "393",
                            "name": "巴州",
                            "pinyin": "bazhou"
                        }
                    ],
                    "C": [
                        {
                            "id": "45",
                            "name": "重庆",
                            "pinyin": "chongqing"
                        },
                        {
                            "id": "59",
                            "name": "成都",
                            "pinyin": "chengdu"
                        },
                        {
                            "id": "70",
                            "name": "长沙",
                            "pinyin": "changsha"
                        },
                        {
                            "id": "89",
                            "name": "常州",
                            "pinyin": "changzhou"
                        },
                        {
                            "id": "116",
                            "name": "长春",
                            "pinyin": "changchun"
                        },
                        {
                            "id": "126",
                            "name": "承德",
                            "pinyin": "chengde"
                        },
                        {
                            "id": "127",
                            "name": "沧州",
                            "pinyin": "cangzhou"
                        },
                        {
                            "id": "131",
                            "name": "长治",
                            "pinyin": "changzhi"
                        },
                        {
                            "id": "142",
                            "name": "赤峰",
                            "pinyin": "chifeng"
                        },
                        {
                            "id": "160",
                            "name": "朝阳",
                            "pinyin": "chaoyang"
                        },
                        {
                            "id": "199",
                            "name": "滁州",
                            "pinyin": "chuzhou"
                        },
                        {
                            "id": "202",
                            "name": "巢湖",
                            "pinyin": "chaohu"
                        },
                        {
                            "id": "205",
                            "name": "池州",
                            "pinyin": "chizhou"
                        },
                        {
                            "id": "268",
                            "name": "常德",
                            "pinyin": "changde"
                        },
                        {
                            "id": "271",
                            "name": "郴州",
                            "pinyin": "chenzhou"
                        },
                        {
                            "id": "287",
                            "name": "潮州",
                            "pinyin": "chaozhou"
                        },
                        {
                            "id": "301",
                            "name": "崇左",
                            "pinyin": "chongzuo"
                        },
                        {
                            "id": "337",
                            "name": "楚雄",
                            "pinyin": "chuxiong"
                        },
                        {
                            "id": "346",
                            "name": "昌都",
                            "pinyin": "changdu"
                        },
                        {
                            "id": "391",
                            "name": "昌吉",
                            "pinyin": "changji"
                        },
                        {
                            "id": "421",
                            "name": "从化",
                            "pinyin": "conghua"
                        },
                        {
                            "id": "422",
                            "name": "常熟",
                            "pinyin": "changshu"
                        }
                    ],
                    "D": [
                        {
                            "id": "65",
                            "name": "大连",
                            "pinyin": "dalian"
                        },
                        {
                            "id": "90",
                            "name": "大庆",
                            "pinyin": "daqing"
                        },
                        {
                            "id": "91",
                            "name": "东莞",
                            "pinyin": "dongguan"
                        },
                        {
                            "id": "129",
                            "name": "大同",
                            "pinyin": "datong"
                        },
                        {
                            "id": "154",
                            "name": "丹东",
                            "pinyin": "dandong"
                        },
                        {
                            "id": "178",
                            "name": "大兴安岭",
                            "pinyin": "daxinganling"
                        },
                        {
                            "id": "223",
                            "name": "东营",
                            "pinyin": "dongying"
                        },
                        {
                            "id": "231",
                            "name": "德州",
                            "pinyin": "dezhou"
                        },
                        {
                            "id": "305",
                            "name": "德阳",
                            "pinyin": "deyang"
                        },
                        {
                            "id": "315",
                            "name": "达州",
                            "pinyin": "dazhou"
                        },
                        {
                            "id": "341",
                            "name": "大理",
                            "pinyin": "dali"
                        },
                        {
                            "id": "342",
                            "name": "德宏",
                            "pinyin": "dehong"
                        },
                        {
                            "id": "344",
                            "name": "迪庆",
                            "pinyin": "diqing"
                        },
                        {
                            "id": "370",
                            "name": "定西",
                            "pinyin": "dingxi"
                        },
                        {
                            "id": "431",
                            "name": "丹阳",
                            "pinyin": "danyang"
                        },
                        {
                            "id": "434",
                            "name": "敦煌",
                            "pinyin": "dunhunag"
                        }
                    ],
                    "E": [
                        {
                            "id": "144",
                            "name": "鄂尔多斯",
                            "pinyin": "eerduosi"
                        },
                        {
                            "id": "254",
                            "name": "鄂州",
                            "pinyin": "ezhou"
                        },
                        {
                            "id": "261",
                            "name": "恩施",
                            "pinyin": "enshi"
                        },
                        {
                            "id": "417",
                            "name": "峨眉山",
                            "pinyin": "emeishan"
                        }
                    ],
                    "F": [
                        {
                            "id": "44",
                            "name": "福州",
                            "pinyin": "fuzhou"
                        },
                        {
                            "id": "92",
                            "name": "佛山",
                            "pinyin": "foshan"
                        },
                        {
                            "id": "152",
                            "name": "抚顺",
                            "pinyin": "fushun"
                        },
                        {
                            "id": "156",
                            "name": "阜新",
                            "pinyin": "fuxin"
                        },
                        {
                            "id": "200",
                            "name": "阜阳",
                            "pinyin": "fuyang"
                        },
                        {
                            "id": "220",
                            "name": "抚州",
                            "pinyin": "fuzhoufz"
                        },
                        {
                            "id": "293",
                            "name": "防城港",
                            "pinyin": "fangchenggang"
                        },
                        {
                            "id": "416",
                            "name": "富阳",
                            "pinyin": "fuyangfy"
                        },
                        {
                            "id": "427",
                            "name": "涪陵",
                            "pinyin": "fuling"
                        }
                    ],
                    "G": [
                        {
                            "id": "20",
                            "name": "广州",
                            "pinyin": "guangzhou"
                        },
                        {
                            "id": "93",
                            "name": "桂林",
                            "pinyin": "guilin"
                        },
                        {
                            "id": "107",
                            "name": "贵阳",
                            "pinyin": "guiyang"
                        },
                        {
                            "id": "217",
                            "name": "赣州",
                            "pinyin": "ganzhou"
                        },
                        {
                            "id": "295",
                            "name": "贵港",
                            "pinyin": "guigang"
                        },
                        {
                            "id": "307",
                            "name": "广元",
                            "pinyin": "guangyuan"
                        },
                        {
                            "id": "314",
                            "name": "广安",
                            "pinyin": "guangan"
                        },
                        {
                            "id": "320",
                            "name": "甘孜",
                            "pinyin": "ganzi"
                        },
                        {
                            "id": "373",
                            "name": "甘南",
                            "pinyin": "gannan"
                        },
                        {
                            "id": "379",
                            "name": "果洛",
                            "pinyin": "guoluo"
                        },
                        {
                            "id": "385",
                            "name": "固原",
                            "pinyin": "guyuan"
                        }
                    ],
                    "H": [
                        {
                            "id": "50",
                            "name": "杭州",
                            "pinyin": "hangzhou"
                        },
                        {
                            "id": "56",
                            "name": "合肥",
                            "pinyin": "hefei"
                        },
                        {
                            "id": "94",
                            "name": "海口",
                            "pinyin": "haikou"
                        },
                        {
                            "id": "95",
                            "name": "葫芦岛",
                            "pinyin": "huludao"
                        },
                        {
                            "id": "105",
                            "name": "哈尔滨",
                            "pinyin": "haerbin"
                        },
                        {
                            "id": "123",
                            "name": "邯郸",
                            "pinyin": "handan"
                        },
                        {
                            "id": "128",
                            "name": "衡水",
                            "pinyin": "hengshui"
                        },
                        {
                            "id": "139",
                            "name": "呼和浩特",
                            "pinyin": "huhehaote"
                        },
                        {
                            "id": "145",
                            "name": "呼伦贝尔",
                            "pinyin": "hulunbeier"
                        },
                        {
                            "id": "170",
                            "name": "鹤岗",
                            "pinyin": "hegang"
                        },
                        {
                            "id": "176",
                            "name": "黑河",
                            "pinyin": "heihe"
                        },
                        {
                            "id": "180",
                            "name": "淮安",
                            "pinyin": "huaian"
                        },
                        {
                            "id": "186",
                            "name": "湖州",
                            "pinyin": "huzhou"
                        },
                        {
                            "id": "193",
                            "name": "淮南",
                            "pinyin": "huainan"
                        },
                        {
                            "id": "195",
                            "name": "淮北",
                            "pinyin": "huaibei"
                        },
                        {
                            "id": "198",
                            "name": "黄山",
                            "pinyin": "huangshan"
                        },
                        {
                            "id": "234",
                            "name": "菏泽",
                            "pinyin": "heze"
                        },
                        {
                            "id": "239",
                            "name": "鹤壁",
                            "pinyin": "hebi"
                        },
                        {
                            "id": "250",
                            "name": "黄石",
                            "pinyin": "huangshi"
                        },
                        {
                            "id": "258",
                            "name": "黄冈",
                            "pinyin": "huanggang"
                        },
                        {
                            "id": "265",
                            "name": "衡阳",
                            "pinyin": "hengyang"
                        },
                        {
                            "id": "273",
                            "name": "怀化",
                            "pinyin": "huaihua"
                        },
                        {
                            "id": "281",
                            "name": "惠州",
                            "pinyin": "huizhou"
                        },
                        {
                            "id": "284",
                            "name": "河源",
                            "pinyin": "heyuan"
                        },
                        {
                            "id": "298",
                            "name": "贺州",
                            "pinyin": "hezhou"
                        },
                        {
                            "id": "299",
                            "name": "河池",
                            "pinyin": "hechi"
                        },
                        {
                            "id": "338",
                            "name": "红河",
                            "pinyin": "honghe"
                        },
                        {
                            "id": "357",
                            "name": "汉中",
                            "pinyin": "hanzhong"
                        },
                        {
                            "id": "375",
                            "name": "海东",
                            "pinyin": "haidong"
                        },
                        {
                            "id": "376",
                            "name": "海北",
                            "pinyin": "haibei"
                        },
                        {
                            "id": "377",
                            "name": "黄南",
                            "pinyin": "huangnan"
                        },
                        {
                            "id": "378",
                            "name": "海南州",
                            "pinyin": "hainanzhou"
                        },
                        {
                            "id": "381",
                            "name": "海西",
                            "pinyin": "haixi"
                        },
                        {
                            "id": "390",
                            "name": "哈密",
                            "pinyin": "hami"
                        },
                        {
                            "id": "397",
                            "name": "和田",
                            "pinyin": "hetian"
                        },
                        {
                            "id": "410",
                            "name": "花都",
                            "pinyin": "huadu"
                        },
                        {
                            "id": "424",
                            "name": "海宁",
                            "pinyin": "haining"
                        }
                    ],
                    "J": [
                        {
                            "id": "96",
                            "name": "济南",
                            "pinyin": "jinan"
                        },
                        {
                            "id": "97",
                            "name": "焦作",
                            "pinyin": "jiaozuo"
                        },
                        {
                            "id": "98",
                            "name": "锦州",
                            "pinyin": "jinzhou"
                        },
                        {
                            "id": "115",
                            "name": "九江",
                            "pinyin": "jiujiang"
                        },
                        {
                            "id": "132",
                            "name": "晋城",
                            "pinyin": "jincheng"
                        },
                        {
                            "id": "134",
                            "name": "晋中",
                            "pinyin": "jinzhong"
                        },
                        {
                            "id": "161",
                            "name": "吉林",
                            "pinyin": "jilin"
                        },
                        {
                            "id": "169",
                            "name": "鸡西",
                            "pinyin": "jixi"
                        },
                        {
                            "id": "173",
                            "name": "佳木斯",
                            "pinyin": "jiamusi"
                        },
                        {
                            "id": "185",
                            "name": "嘉兴",
                            "pinyin": "jiaxing"
                        },
                        {
                            "id": "188",
                            "name": "金华",
                            "pinyin": "jinhua"
                        },
                        {
                            "id": "213",
                            "name": "景德镇",
                            "pinyin": "jingdezhen"
                        },
                        {
                            "id": "218",
                            "name": "吉安",
                            "pinyin": "jian"
                        },
                        {
                            "id": "225",
                            "name": "济宁",
                            "pinyin": "jining"
                        },
                        {
                            "id": "249",
                            "name": "济源",
                            "pinyin": "jiyuan"
                        },
                        {
                            "id": "255",
                            "name": "荆门",
                            "pinyin": "jingmen"
                        },
                        {
                            "id": "257",
                            "name": "荆州",
                            "pinyin": "jingzhou"
                        },
                        {
                            "id": "277",
                            "name": "江门",
                            "pinyin": "jiangmen"
                        },
                        {
                            "id": "288",
                            "name": "揭阳",
                            "pinyin": "jieyang"
                        },
                        {
                            "id": "362",
                            "name": "金昌",
                            "pinyin": "jinchang"
                        },
                        {
                            "id": "368",
                            "name": "酒泉",
                            "pinyin": "jiuquan"
                        },
                        {
                            "id": "404",
                            "name": "江阴",
                            "pinyin": "jiangyin"
                        },
                        {
                            "id": "409",
                            "name": "嘉峪关",
                            "pinyin": "jiayuguan"
                        },
                        {
                            "id": "420",
                            "name": "晋江",
                            "pinyin": "jinjiang"
                        },
                        {
                            "id": "429",
                            "name": "江宁",
                            "pinyin": "jiangning"
                        },
                        {
                            "id": "439",
                            "name": "靖江",
                            "pinyin": "jingjiang"
                        }
                    ],
                    "K": [
                        {
                            "id": "114",
                            "name": "昆明",
                            "pinyin": "kunming"
                        },
                        {
                            "id": "235",
                            "name": "开封",
                            "pinyin": "kaifeng"
                        },
                        {
                            "id": "388",
                            "name": "克拉玛依",
                            "pinyin": "kelamayi"
                        },
                        {
                            "id": "395",
                            "name": "克州",
                            "pinyin": "kezhou"
                        },
                        {
                            "id": "396",
                            "name": "喀什",
                            "pinyin": "kashi"
                        },
                        {
                            "id": "403",
                            "name": "昆山",
                            "pinyin": "kunshan"
                        }
                    ],
                    "L": [
                        {
                            "id": "106",
                            "name": "廊坊",
                            "pinyin": "langfang"
                        },
                        {
                            "id": "137",
                            "name": "临汾",
                            "pinyin": "linfen"
                        },
                        {
                            "id": "138",
                            "name": "吕梁",
                            "pinyin": "lvliang"
                        },
                        {
                            "id": "157",
                            "name": "辽阳",
                            "pinyin": "liaoyang"
                        },
                        {
                            "id": "163",
                            "name": "辽源",
                            "pinyin": "liaoyuan"
                        },
                        {
                            "id": "179",
                            "name": "连云港",
                            "pinyin": "lianyungang"
                        },
                        {
                            "id": "192",
                            "name": "丽水",
                            "pinyin": "lishui"
                        },
                        {
                            "id": "203",
                            "name": "六安",
                            "pinyin": "liuan"
                        },
                        {
                            "id": "211",
                            "name": "龙岩",
                            "pinyin": "longyan"
                        },
                        {
                            "id": "229",
                            "name": "莱芜",
                            "pinyin": "laiwu"
                        },
                        {
                            "id": "230",
                            "name": "临沂",
                            "pinyin": "linyi"
                        },
                        {
                            "id": "232",
                            "name": "聊城",
                            "pinyin": "liaocheng"
                        },
                        {
                            "id": "236",
                            "name": "洛阳",
                            "pinyin": "luoyang"
                        },
                        {
                            "id": "242",
                            "name": "漯河",
                            "pinyin": "luohe"
                        },
                        {
                            "id": "274",
                            "name": "娄底",
                            "pinyin": "loudi"
                        },
                        {
                            "id": "290",
                            "name": "柳州",
                            "pinyin": "liuzhou"
                        },
                        {
                            "id": "300",
                            "name": "来宾",
                            "pinyin": "laibin"
                        },
                        {
                            "id": "304",
                            "name": "泸州",
                            "pinyin": "luzhou"
                        },
                        {
                            "id": "310",
                            "name": "乐山",
                            "pinyin": "leshan"
                        },
                        {
                            "id": "321",
                            "name": "凉山",
                            "pinyin": "liangshan"
                        },
                        {
                            "id": "322",
                            "name": "六盘水",
                            "pinyin": "liupanshui"
                        },
                        {
                            "id": "334",
                            "name": "丽江",
                            "pinyin": "lijiang"
                        },
                        {
                            "id": "336",
                            "name": "临沧",
                            "pinyin": "lincang"
                        },
                        {
                            "id": "345",
                            "name": "拉萨",
                            "pinyin": "lasa"
                        },
                        {
                            "id": "351",
                            "name": "林芝",
                            "pinyin": "linzhi"
                        },
                        {
                            "id": "361",
                            "name": "兰州",
                            "pinyin": "lanzhou"
                        },
                        {
                            "id": "371",
                            "name": "陇南",
                            "pinyin": "longnan"
                        },
                        {
                            "id": "372",
                            "name": "临夏",
                            "pinyin": "linxia"
                        }
                    ],
                    "M": [
                        {
                            "id": "175",
                            "name": "牡丹江",
                            "pinyin": "mudanjiang"
                        },
                        {
                            "id": "194",
                            "name": "马鞍山",
                            "pinyin": "maanshan"
                        },
                        {
                            "id": "279",
                            "name": "茂名",
                            "pinyin": "maoming"
                        },
                        {
                            "id": "282",
                            "name": "梅州",
                            "pinyin": "meizhou"
                        },
                        {
                            "id": "306",
                            "name": "绵阳",
                            "pinyin": "mianyang"
                        },
                        {
                            "id": "312",
                            "name": "眉山",
                            "pinyin": "meishan"
                        }
                    ],
                    "N": [
                        {
                            "id": "51",
                            "name": "宁波",
                            "pinyin": "ningbo"
                        },
                        {
                            "id": "55",
                            "name": "南京",
                            "pinyin": "nanjing"
                        },
                        {
                            "id": "82",
                            "name": "南通",
                            "pinyin": "nantong"
                        },
                        {
                            "id": "83",
                            "name": "南昌",
                            "pinyin": "nanchang"
                        },
                        {
                            "id": "99",
                            "name": "南宁",
                            "pinyin": "nanning"
                        },
                        {
                            "id": "210",
                            "name": "南平",
                            "pinyin": "nanping"
                        },
                        {
                            "id": "212",
                            "name": "宁德",
                            "pinyin": "ningde"
                        },
                        {
                            "id": "244",
                            "name": "南阳",
                            "pinyin": "nanyang"
                        },
                        {
                            "id": "309",
                            "name": "内江",
                            "pinyin": "neijiang"
                        },
                        {
                            "id": "311",
                            "name": "南充",
                            "pinyin": "nanchong"
                        },
                        {
                            "id": "343",
                            "name": "怒江",
                            "pinyin": "nujiang"
                        },
                        {
                            "id": "349",
                            "name": "那曲",
                            "pinyin": "naqu"
                        }
                    ],
                    "P": [
                        {
                            "id": "158",
                            "name": "盘锦",
                            "pinyin": "panjin"
                        },
                        {
                            "id": "207",
                            "name": "莆田",
                            "pinyin": "putian"
                        },
                        {
                            "id": "214",
                            "name": "萍乡",
                            "pinyin": "pingxiang"
                        },
                        {
                            "id": "237",
                            "name": "平顶山",
                            "pinyin": "pingdingshan"
                        },
                        {
                            "id": "240",
                            "name": "濮阳",
                            "pinyin": "puyang"
                        },
                        {
                            "id": "303",
                            "name": "攀枝花",
                            "pinyin": "panzhihua"
                        },
                        {
                            "id": "335",
                            "name": "普洱",
                            "pinyin": "puer"
                        },
                        {
                            "id": "367",
                            "name": "平凉",
                            "pinyin": "pingliang"
                        },
                        {
                            "id": "411",
                            "name": "番禺",
                            "pinyin": "panyu"
                        }
                    ],
                    "Q": [
                        {
                            "id": "60",
                            "name": "青岛",
                            "pinyin": "qingdao"
                        },
                        {
                            "id": "109",
                            "name": "齐齐哈尔",
                            "pinyin": "qiqihaer"
                        },
                        {
                            "id": "110",
                            "name": "泉州",
                            "pinyin": "quanzhou"
                        },
                        {
                            "id": "122",
                            "name": "秦皇岛",
                            "pinyin": "qinhuangdao"
                        },
                        {
                            "id": "174",
                            "name": "七台河",
                            "pinyin": "qitaihe"
                        },
                        {
                            "id": "189",
                            "name": "衢州",
                            "pinyin": "quzhou"
                        },
                        {
                            "id": "286",
                            "name": "清远",
                            "pinyin": "qingyuan"
                        },
                        {
                            "id": "294",
                            "name": "钦州",
                            "pinyin": "qinzhou"
                        },
                        {
                            "id": "326",
                            "name": "黔西南",
                            "pinyin": "qianxinan"
                        },
                        {
                            "id": "328",
                            "name": "黔东南",
                            "pinyin": "qiandongnan"
                        },
                        {
                            "id": "329",
                            "name": "黔南",
                            "pinyin": "qiannan"
                        },
                        {
                            "id": "330",
                            "name": "曲靖",
                            "pinyin": "qujing"
                        },
                        {
                            "id": "369",
                            "name": "庆阳",
                            "pinyin": "qingyang"
                        },
                        {
                            "id": "418",
                            "name": "琼海",
                            "pinyin": "qionghai"
                        },
                        {
                            "id": "430",
                            "name": "迁安",
                            "pinyin": "qianan"
                        }
                    ],
                    "R": [
                        {
                            "id": "228",
                            "name": "日照",
                            "pinyin": "rizhao"
                        },
                        {
                            "id": "348",
                            "name": "日喀则",
                            "pinyin": "rikaze"
                        }
                    ],
                    "S": [
                        {
                            "id": "10",
                            "name": "上海",
                            "pinyin": "shanghai"
                        },
                        {
                            "id": "30",
                            "name": "深圳",
                            "pinyin": "shenzhen"
                        },
                        {
                            "id": "66",
                            "name": "沈阳",
                            "pinyin": "shenyang"
                        },
                        {
                            "id": "76",
                            "name": "石家庄",
                            "pinyin": "shijiazhuang"
                        },
                        {
                            "id": "80",
                            "name": "苏州",
                            "pinyin": "suzhou"
                        },
                        {
                            "id": "111",
                            "name": "三亚",
                            "pinyin": "sanya"
                        },
                        {
                            "id": "117",
                            "name": "汕头",
                            "pinyin": "shantou"
                        },
                        {
                            "id": "133",
                            "name": "朔州",
                            "pinyin": "shuozhou"
                        },
                        {
                            "id": "162",
                            "name": "四平",
                            "pinyin": "siping"
                        },
                        {
                            "id": "166",
                            "name": "松原",
                            "pinyin": "songyuan"
                        },
                        {
                            "id": "171",
                            "name": "双鸭山",
                            "pinyin": "shuangyashan"
                        },
                        {
                            "id": "177",
                            "name": "绥化",
                            "pinyin": "suihua"
                        },
                        {
                            "id": "184",
                            "name": "宿迁",
                            "pinyin": "suqian"
                        },
                        {
                            "id": "187",
                            "name": "绍兴",
                            "pinyin": "shaoxing"
                        },
                        {
                            "id": "201",
                            "name": "宿州",
                            "pinyin": "suzhousz"
                        },
                        {
                            "id": "208",
                            "name": "三明",
                            "pinyin": "sanming"
                        },
                        {
                            "id": "221",
                            "name": "上饶",
                            "pinyin": "shangrao"
                        },
                        {
                            "id": "243",
                            "name": "三门峡",
                            "pinyin": "sanmenxia"
                        },
                        {
                            "id": "245",
                            "name": "商丘",
                            "pinyin": "shangqiu"
                        },
                        {
                            "id": "251",
                            "name": "十堰",
                            "pinyin": "shiyan"
                        },
                        {
                            "id": "260",
                            "name": "随州",
                            "pinyin": "suizhou"
                        },
                        {
                            "id": "262",
                            "name": "三峡",
                            "pinyin": "sanxia"
                        },
                        {
                            "id": "266",
                            "name": "邵阳",
                            "pinyin": "shaoyang"
                        },
                        {
                            "id": "276",
                            "name": "韶关",
                            "pinyin": "shaoguan"
                        },
                        {
                            "id": "283",
                            "name": "汕尾",
                            "pinyin": "shanwei"
                        },
                        {
                            "id": "308",
                            "name": "遂宁",
                            "pinyin": "suining"
                        },
                        {
                            "id": "347",
                            "name": "山南",
                            "pinyin": "shannan"
                        },
                        {
                            "id": "360",
                            "name": "商洛",
                            "pinyin": "shangluo"
                        },
                        {
                            "id": "383",
                            "name": "石嘴山",
                            "pinyin": "shizuishan"
                        },
                        {
                            "id": "406",
                            "name": "顺德",
                            "pinyin": "shunde"
                        },
                        {
                            "id": "408",
                            "name": "石河子",
                            "pinyin": "shihezi"
                        },
                        {
                            "id": "440",
                            "name": "石狮",
                            "pinyin": "shishi"
                        }
                    ],
                    "T": [
                        {
                            "id": "40",
                            "name": "天津",
                            "pinyin": "tianjin"
                        },
                        {
                            "id": "101",
                            "name": "太原",
                            "pinyin": "taiyuan"
                        },
                        {
                            "id": "121",
                            "name": "唐山",
                            "pinyin": "tangshan"
                        },
                        {
                            "id": "143",
                            "name": "通辽",
                            "pinyin": "tongliao"
                        },
                        {
                            "id": "159",
                            "name": "铁岭",
                            "pinyin": "tieling"
                        },
                        {
                            "id": "164",
                            "name": "通化",
                            "pinyin": "tonghua"
                        },
                        {
                            "id": "183",
                            "name": "泰州",
                            "pinyin": "taizhou"
                        },
                        {
                            "id": "191",
                            "name": "台州",
                            "pinyin": "taizhoutz"
                        },
                        {
                            "id": "196",
                            "name": "铜陵",
                            "pinyin": "tongling"
                        },
                        {
                            "id": "226",
                            "name": "泰安",
                            "pinyin": "taian"
                        },
                        {
                            "id": "325",
                            "name": "铜仁",
                            "pinyin": "tongrendiqu"
                        },
                        {
                            "id": "352",
                            "name": "铜川",
                            "pinyin": "tongchuan"
                        },
                        {
                            "id": "364",
                            "name": "天水",
                            "pinyin": "tianshui"
                        },
                        {
                            "id": "389",
                            "name": "吐鲁番",
                            "pinyin": "tulufan"
                        },
                        {
                            "id": "399",
                            "name": "塔城",
                            "pinyin": "tacheng"
                        },
                        {
                            "id": "401",
                            "name": "台北",
                            "pinyin": "taibei"
                        },
                        {
                            "id": "425",
                            "name": "桐乡",
                            "pinyin": "tongxiang"
                        },
                        {
                            "id": "432",
                            "name": "太仓",
                            "pinyin": "taicang"
                        },
                        {
                            "id": "435",
                            "name": "塘沽",
                            "pinyin": "tanggu"
                        }
                    ],
                    "W": [
                        {
                            "id": "52",
                            "name": "无锡",
                            "pinyin": "wuxi"
                        },
                        {
                            "id": "57",
                            "name": "武汉",
                            "pinyin": "wuhan"
                        },
                        {
                            "id": "102",
                            "name": "芜湖",
                            "pinyin": "wuhu"
                        },
                        {
                            "id": "112",
                            "name": "温州",
                            "pinyin": "wenzhou"
                        },
                        {
                            "id": "141",
                            "name": "乌海",
                            "pinyin": "wuhai"
                        },
                        {
                            "id": "147",
                            "name": "乌兰察布",
                            "pinyin": "wulanchabu"
                        },
                        {
                            "id": "224",
                            "name": "潍坊",
                            "pinyin": "weifang"
                        },
                        {
                            "id": "227",
                            "name": "威海",
                            "pinyin": "weihai"
                        },
                        {
                            "id": "291",
                            "name": "梧州",
                            "pinyin": "wuzhou"
                        },
                        {
                            "id": "339",
                            "name": "文山",
                            "pinyin": "wenshan"
                        },
                        {
                            "id": "355",
                            "name": "渭南",
                            "pinyin": "weinan"
                        },
                        {
                            "id": "365",
                            "name": "武威",
                            "pinyin": "wuwei"
                        },
                        {
                            "id": "384",
                            "name": "吴忠",
                            "pinyin": "wuzhong"
                        },
                        {
                            "id": "387",
                            "name": "乌鲁木齐",
                            "pinyin": "wulumuqi"
                        },
                        {
                            "id": "428",
                            "name": "万州",
                            "pinyin": "wanzhou"
                        },
                        {
                            "id": "433",
                            "name": "吴江",
                            "pinyin": "wujiang"
                        },
                        {
                            "id": "443",
                            "name": "武夷山",
                            "pinyin": "wuyishan"
                        }
                    ],
                    "X": [
                        {
                            "id": "42",
                            "name": "西安",
                            "pinyin": "xian"
                        },
                        {
                            "id": "62",
                            "name": "厦门",
                            "pinyin": "xiamen"
                        },
                        {
                            "id": "103",
                            "name": "新乡",
                            "pinyin": "xinxiang"
                        },
                        {
                            "id": "118",
                            "name": "香港",
                            "pinyin": "xianggang"
                        },
                        {
                            "id": "119",
                            "name": "徐州",
                            "pinyin": "xuzhou"
                        },
                        {
                            "id": "124",
                            "name": "邢台",
                            "pinyin": "xingtai"
                        },
                        {
                            "id": "136",
                            "name": "忻州",
                            "pinyin": "xinzhou"
                        },
                        {
                            "id": "148",
                            "name": "兴安",
                            "pinyin": "xinganmeng"
                        },
                        {
                            "id": "149",
                            "name": "锡林郭勒",
                            "pinyin": "xilinguolemeng"
                        },
                        {
                            "id": "206",
                            "name": "宣城",
                            "pinyin": "xuancheng"
                        },
                        {
                            "id": "215",
                            "name": "新余",
                            "pinyin": "xinyu"
                        },
                        {
                            "id": "241",
                            "name": "许昌",
                            "pinyin": "xuchang"
                        },
                        {
                            "id": "246",
                            "name": "信阳",
                            "pinyin": "xinyang"
                        },
                        {
                            "id": "253",
                            "name": "襄阳",
                            "pinyin": "xiangyang"
                        },
                        {
                            "id": "256",
                            "name": "孝感",
                            "pinyin": "xiaogan"
                        },
                        {
                            "id": "259",
                            "name": "咸宁",
                            "pinyin": "xianning"
                        },
                        {
                            "id": "264",
                            "name": "湘潭",
                            "pinyin": "xiangtan"
                        },
                        {
                            "id": "275",
                            "name": "湘西",
                            "pinyin": "xiangxi"
                        },
                        {
                            "id": "340",
                            "name": "西双版纳",
                            "pinyin": "xishuangbanna"
                        },
                        {
                            "id": "354",
                            "name": "咸阳",
                            "pinyin": "xianyang"
                        },
                        {
                            "id": "374",
                            "name": "西宁",
                            "pinyin": "xining"
                        },
                        {
                            "id": "412",
                            "name": "仙桃",
                            "pinyin": "xiantao"
                        },
                        {
                            "id": "445",
                            "name": "萧山",
                            "pinyin": "xiaoshan"
                        }
                    ],
                    "Y": [
                        {
                            "id": "104",
                            "name": "烟台",
                            "pinyin": "yantai"
                        },
                        {
                            "id": "120",
                            "name": "扬州",
                            "pinyin": "yangzhou"
                        },
                        {
                            "id": "130",
                            "name": "阳泉",
                            "pinyin": "yangquan"
                        },
                        {
                            "id": "135",
                            "name": "运城",
                            "pinyin": "yuncheng"
                        },
                        {
                            "id": "155",
                            "name": "营口",
                            "pinyin": "yingkou"
                        },
                        {
                            "id": "168",
                            "name": "延边",
                            "pinyin": "yanbian"
                        },
                        {
                            "id": "172",
                            "name": "伊春",
                            "pinyin": "yichunyc"
                        },
                        {
                            "id": "181",
                            "name": "盐城",
                            "pinyin": "yancheng"
                        },
                        {
                            "id": "216",
                            "name": "鹰潭",
                            "pinyin": "yingtan"
                        },
                        {
                            "id": "219",
                            "name": "宜春",
                            "pinyin": "yichun"
                        },
                        {
                            "id": "252",
                            "name": "宜昌",
                            "pinyin": "yichang"
                        },
                        {
                            "id": "267",
                            "name": "岳阳",
                            "pinyin": "yueyang"
                        },
                        {
                            "id": "270",
                            "name": "益阳",
                            "pinyin": "yiyang"
                        },
                        {
                            "id": "272",
                            "name": "永州",
                            "pinyin": "yongzhou"
                        },
                        {
                            "id": "285",
                            "name": "阳江",
                            "pinyin": "yangjiang"
                        },
                        {
                            "id": "289",
                            "name": "云浮",
                            "pinyin": "yunfu"
                        },
                        {
                            "id": "296",
                            "name": "玉林",
                            "pinyin": "yulin"
                        },
                        {
                            "id": "313",
                            "name": "宜宾",
                            "pinyin": "yibin"
                        },
                        {
                            "id": "316",
                            "name": "雅安",
                            "pinyin": "yaan"
                        },
                        {
                            "id": "331",
                            "name": "玉溪",
                            "pinyin": "yuxi"
                        },
                        {
                            "id": "356",
                            "name": "延安",
                            "pinyin": "yanan"
                        },
                        {
                            "id": "358",
                            "name": "榆林",
                            "pinyin": "yulinyl"
                        },
                        {
                            "id": "380",
                            "name": "玉树",
                            "pinyin": "yushu"
                        },
                        {
                            "id": "382",
                            "name": "银川",
                            "pinyin": "yinchuan"
                        },
                        {
                            "id": "398",
                            "name": "伊犁",
                            "pinyin": "yili"
                        },
                        {
                            "id": "405",
                            "name": "义乌",
                            "pinyin": "yiwu"
                        },
                        {
                            "id": "423",
                            "name": "延吉",
                            "pinyin": "yanji"
                        }
                    ],
                    "Z": [
                        {
                            "id": "73",
                            "name": "郑州",
                            "pinyin": "zhengzhou"
                        },
                        {
                            "id": "81",
                            "name": "淄博",
                            "pinyin": "zibo"
                        },
                        {
                            "id": "108",
                            "name": "珠海",
                            "pinyin": "zhuhai"
                        },
                        {
                            "id": "113",
                            "name": "中山",
                            "pinyin": "zhongshan"
                        },
                        {
                            "id": "125",
                            "name": "张家口",
                            "pinyin": "zhangjiakou"
                        },
                        {
                            "id": "182",
                            "name": "镇江",
                            "pinyin": "zhenjiang"
                        },
                        {
                            "id": "190",
                            "name": "舟山",
                            "pinyin": "zhoushan"
                        },
                        {
                            "id": "209",
                            "name": "漳州",
                            "pinyin": "zhangzhou"
                        },
                        {
                            "id": "222",
                            "name": "枣庄",
                            "pinyin": "zaozhuang"
                        },
                        {
                            "id": "247",
                            "name": "周口",
                            "pinyin": "zhoukou"
                        },
                        {
                            "id": "248",
                            "name": "驻马店",
                            "pinyin": "zhumadian"
                        },
                        {
                            "id": "263",
                            "name": "株洲",
                            "pinyin": "zhuzhou"
                        },
                        {
                            "id": "269",
                            "name": "张家界",
                            "pinyin": "zhangjiajie"
                        },
                        {
                            "id": "278",
                            "name": "湛江",
                            "pinyin": "zhanjiang"
                        },
                        {
                            "id": "280",
                            "name": "肇庆",
                            "pinyin": "zhaoqing"
                        },
                        {
                            "id": "302",
                            "name": "自贡",
                            "pinyin": "zigong"
                        },
                        {
                            "id": "318",
                            "name": "资阳",
                            "pinyin": "ziyang"
                        },
                        {
                            "id": "323",
                            "name": "遵义",
                            "pinyin": "zunyi"
                        },
                        {
                            "id": "333",
                            "name": "昭通",
                            "pinyin": "zhaotong"
                        },
                        {
                            "id": "366",
                            "name": "张掖",
                            "pinyin": "zhangye"
                        },
                        {
                            "id": "386",
                            "name": "中卫",
                            "pinyin": "zhongwei"
                        },
                        {
                            "id": "419",
                            "name": "张家港",
                            "pinyin": "zhangjiagang"
                        },
                        {
                            "id": "426",
                            "name": "涿州",
                            "pinyin": "zhuozhou"
                        }
                    ]
                }
            },
            acindex: 0
        }
    },
    methods: {

        cindex(index) {
            this.acindex = index;
        },
        huaindex(index) {
            this.acindex = index;
        }
    },

}
</script>

<style scoped>

</style>