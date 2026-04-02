const fs = require("fs");
const path = require("path");
const { 
    Document, 
    Packer, 
    Paragraph, 
    TextRun, 
    Footer, 
    AlignmentType, 
    PageNumber 
} = require("docx");

// Folder containing subject files
const topicsFolder = "./topics";

// Read all subject files
const files = fs.readdirSync(topicsFolder);

async function generateDocs() {

    for (const file of files) {

        const subjectData = require(path.join(__dirname, topicsFolder, file));

        const subject = subjectData.subject;
        const topics = subjectData.topics;
        let number = subjectData.start;

        // Create subject folder
        const subjectFolder = path.join(__dirname, subject);

        if (!fs.existsSync(subjectFolder)) {
            fs.mkdirSync(subjectFolder);
        }

        console.log(`\nCreating files for ${subject}...`);

        for (const topic of topics) {

            const footer = new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                children: [PageNumber.CURRENT]
                            })
                        ]
                    })
                ]
            });

            const doc = new Document({
                sections: [
                    {
                        footers: {
                            default: footer
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${subject} ${number} - ${topic}`,
                                        bold: true,
                                        size: 32
                                    })
                                ]
                            }),
                            new Paragraph(`Notes for ${topic}`)
                        ]
                    }
                ]
            });

            const buffer = await Packer.toBuffer(doc);

            const fileName = `${subject}${number}-${topic}.docx`;

            fs.writeFileSync(
                path.join(subjectFolder, fileName),
                buffer
            );

            console.log(fileName);

            number++;
        }
    }
}

generateDocs();