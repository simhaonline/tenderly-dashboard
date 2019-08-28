import {NotificationDestinationTypes} from "../../Common/constants";

class NotificationDestination {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type NotificationDestinationTypes */
        this.type = data.type;

        /** @type string */
        this.label = data.label;

        /** @type Object */
        this.information = data.information;
    }

    /**
     * @return {string}
     */
    getTypeLabel() {
        switch (this.type) {
            case NotificationDestinationTypes.EMAIL:
                return 'E-mail';
            case NotificationDestinationTypes.WEBHOOK:
                return 'Webhook';
            case NotificationDestinationTypes.EMAIL_GROUP:
                return 'E-mail Group';
            case NotificationDestinationTypes.SLACK:
                return 'Slack';
            default:
                return '';
        }
    }

    /**
     * @param {NotificationDestinationTypes} type
     * @param {string} value
     * @return {Object}
     */
    static transformInformationToApiPayload(type, value) {
        switch (type) {
            case NotificationDestinationTypes.EMAIL:
                return {
                    emails: [value],
                };
            default:
                return {};
        }
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
                       channel: information.channel_name,
                       team: information.team_name,
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
