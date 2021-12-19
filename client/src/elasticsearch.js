const elasticsearch = require("elasticsearch");
const connectionString = "https://paas:2e9670d4fa190cb62677776113a97e4f@oin-us-east-1.searchly.com";
const client = new elasticsearch.Client({
    host: connectionString
});

/* Course Time */
client.index({
	index: "courseTime",
	type: "document",
	id: "1",
	body: {
		name: "2022 Spring Semester (01/18/2022-05/18/2022)"
	}
});

/* Course Prefix */
client.index({
	index: "coursePrefix",
	type: "document",
	id: "1",
	body: {
		name: "AAI"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "2",
	body: {
		name: "ACC"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "3",
	body: {
		name: "BIA"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "4",
	body: {
		name: "BIO"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "5",
	body: {
		name: "BME"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "6",
	body: {
		name: "CE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "7",
	body: {
		name: "CH"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "8",
	body: {
		name: "CHE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "9",
	body: {
		name: "CM"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "10",
	body: {
		name: "CPE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "11",
	body: {
		name: "CS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "12",
	body: {
		name: "EE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "13",
	body: {
		name: "ELC"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "14",
	body: {
		name: "EM"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "15",
	body: {
		name: "EMT"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "16",
	body: {
		name: "ELC"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "17",
	body: {
		name: "EN"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "18",
	body: {
		name: "FA"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "19",
	body: {
		name: "FE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "20",
	body: {
		name: "FIN"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "21",
	body: {
		name: "IPD"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "22",
	body: {
		name: "MA"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "23",
	body: {
		name: "ME"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "24",
	body: {
		name: "MGT"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "25",
	body: {
		name: "MIS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "26",
	body: {
		name: "MT"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "27",
	body: {
		name: "NANO"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "28",
	body: {
		name: "NIS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "29",
	body: {
		name: "OE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "30",
	body: {
		name: "PEP"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "31",
	body: {
		name: "PME"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "32",
	body: {
		name: "PRV"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "33",
	body: {
		name: "SM"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "34",
	body: {
		name: "SOC"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "35",
	body: {
		name: "SSW"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "36",
	body: {
		name: "SYS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "37",
	body: {
		name: "TM"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "38",
	body: {
		name: "BIOE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "39",
	body: {
		name: "CAL"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "40",
	body: {
		name: "DEAN"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "41",
	body: {
		name: "DS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "42",
	body: {
		name: "ES"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "43",
	body: {
		name: "BT"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "44",
	body: {
		name: "CLK"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "45",
	body: {
		name: "ENGR"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "46",
	body: {
		name: "HAR"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "47",
	body: {
		name: "HHS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "48",
	body: {
		name: "HLI"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "49",
	body: {
		name: "HMU"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "50",
	body: {
		name: "HPL"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "51",
	body: {
		name: "HSS"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "52",
	body: {
		name: "HST"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "53",
	body: {
		name: "HTH"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "54",
	body: {
		name: "IDE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "55",
	body: {
		name: "ISE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "56",
	body: {
		name: "LCH"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "57",
	body: {
		name: "LFR"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "58",
	body: {
		name: "LSP"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "59",
	body: {
		name: "NE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "60",
	body: {
		name: "PE"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "61",
	body: {
		name: "PIN"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "62",
	body: {
		name: "QF"
	}
});

client.index({
	index: "coursePrefix",
	type: "document",
	id: "60",
	body: {
		name: "REG"
	}
});

/* Course Level */
client.index({
	index: "courseLevel",
	type: "document",
	id: "1",
	body: {
		name: "Certificate Programs"
	}
});

client.index({
	index: "courseLevel",
	type: "document",
	id: "2",
	body: {
		name: "Doctoral"
	}
});

client.index({
	index: "courseLevel",
	type: "document",
	id: "3",
	body: {
		name: "Graduate"
	}
});

client.index({
	index: "courseLevel",
	type: "document",
	id: "4",
	body: {
		name: "Non-Degree"
	}
});

client.index({
	index: "courseLevel",
	type: "document",
	id: "5",
	body: {
		name: "Undergraduate"
	}
});

/* Section Status */
client.index({
	index: "sectionStatus",
	type: "document",
	id: "1",
	body: {
		name: "Open"
	}
});

client.index({
	index: "sectionStatus",
	type: "document",
	id: "2",
	body: {
		name: "Closed"
	}
});

/* Format */
client.index({
	index: "format",
	type: "document",
	id: "1",
	body: {
		name: "Lecture"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "2",
	body: {
		name: "Laboratory"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "3",
	body: {
		name: "Combination"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "4",
	body: {
		name: "Seminar"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "5",
	body: {
		name: "Thesis"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "6",
	body: {
		name: "Internship"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "7",
	body: {
		name: "Recitation"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "8",
	body: {
		name: "Discussion"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "9",
	body: {
		name: "Workshop"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "10",
	body: {
		name: "Studio"
	}
});

client.index({
	index: "format",
	type: "document",
	id: "11",
	body: {
		name: "Research"
	}
});

/* Delivery Mode */
client.index({
	index: "deliveryMode",
	type: "document",
	id: "1",
	body: {
		name: "In-Person"
	}
});

client.index({
	index: "deliveryMode",
	type: "document",
	id: "2",
	body: {
		name: "Online"
	}
});

client.index({
	index: "deliveryMode",
	type: "document",
	id: "3",
	body: {
		name: "Hybrid"
	}
});