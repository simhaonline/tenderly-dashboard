import {NotificationDestinationTypes} from "../../Common/constants";

class NotificationDestination {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type NotificationDestinationTypes */
        this.type = data.type;

        /** @type string */
        this.label = data.label;

        /** @type string */
        this.information = data.information;
    }

    /**
     * @param type
     * @param information
     * @return {Object}
     */
    static parseResponseInformation(type, information) {
       switch (type) {
           case 'email':
               if (!!information.emails && information.emails.length === 1) {
                   return {
                       type: NotificationDestinationTypes.EMAIL,
                       information: {
                           email: information.emails[0],
                       },
                   };
               }

               return {
                   type: NotificationDestinationTypes.EMAIL_GROUP,
                   information: {
                       emails: information.emails,
                   },
               };
           case 'slack':
               return {
                   type: NotificationDestinationTypes.SLACK,
                   information: {
                       webhook: information.webhook_url,
                   },
               };
           default:
               return {
                   information: {},
               };
       }
    }

    /**
     * @param {Object} response
     * @return {NotificationDestination}
     */
    static buildFromResponse(response) {
        const info = NotificationDestination.parseResponseInformation(response.type, response.information);

        return new NotificationDestination({
            id: response.id,
            label: response.label,
            information: info.information,
            type: info.type,
        });
    }
}

export default NotificationDestination;
