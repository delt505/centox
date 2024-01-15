import FormField from "./formField";
import FormPermission from "./formPermission";

export default interface Form {
    _id: string;
    name: string;
    icon?: string;
    createdAt: number;
    updatedAt: number;
    fields: FormField[];
    permissions: { [key: string]: FormPermission };
}


/*


{
    "_id": "5d8b9f8f8f8f8f8f8f8f8f8f",
    "name": "Youtube",
    "icon": "FaYoutube",
    "fields": [
        {
            "_id": "5d8b9f8f8f8f8f8f8f8f8f8f",
            "type": "shortText",
            "label": "What's your name?",
            "description": "",
            "required": true
        }
    ],
    "permissions": {
        "admin": {
            "create": true,
            "viewOthers": true,
            "comment": true
        }
    }
}
*/
