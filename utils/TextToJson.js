class TextToJson {
    constructor(text) {
        this.text = text;
        this.text = text.replace(/\r\n/g, " ");
    }
    getDetails() {
        return {
            sl_no: this.getText(/Sl No\s(.*?)Tag/i),
            voter_no: this.getText(/Voter No\s(.*?)Form/i),
            name_bangla: this.getText(/Name\(Bangla\)\s(.*?)Name\(English\)/i),
            name_english: this.getText(/Name\(English\)\s(.*?)Date of Birth/i),
            nid_number: this.getText(/National ID\s(.*?)Pin/i),
            pin_number: this.getText(/Pin\s(.*?)Status/i),
            father_name: this.getText(/Father Name\s*(\W+)/i),
            mother_name: this.getText(/Mother Name\s*(\W+)/i),
            spouse_name: this.getText(/Spouse Name\s*(\W+)/i),
            gender: this.getText(/Gender\s*(\w+)/i),
            maritial: this.getText(/Marital\s*(\w+)/i),
            Occupation: this.getText(/occupation\s*(\W+)/i),
            birth_place: this.getText(/Birth Place\s*(\W+)/i),
            birth_registration: this.getText(/Birth Registration No\s*(\w+)/i),
            date_of_birth: this.getText(/Date of Birth\s(.*?)Birth Place/i),
            blood_group: this.getText(/Blood Group\s(.*?)TIN/i),
            mobile:
                this.getText(/Phone\s(.*?)Mobile/i) ||
                /Mobile(.[ ]*)([0-9]*?)(.[ ]*)Religion/i
                    .exec(this.text)[2]
                    .trim(),
            religion: this.getText(/Religion\s((.|\n)*?)Religion Other/i),
            voter_area: this.getText(/Voter Area\s([^.]*?)Voter At/i),
            voter_at: this.getText(/Voter At\s(.*)/i),
        };
    }
    getText(pattern) {
        return pattern.exec(this.text)[1].trim().replace("ু ", "ু");
    }
}

module.exports = TextToJson;
