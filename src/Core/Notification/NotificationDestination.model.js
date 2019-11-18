import {NotificationDestinationAppToApiTypes, NotificationDestinationTypes} from "../../Common/constants";

/**
 * @typedef NotificationDestinationInformation
 * @type {Object}
 * @property {string} [email]
 * @property {string} [channel]
 * @property {string} [team]
 */

class NotificationDestination {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type NotificationDestinationTypes */
        this.type = data.type;

        /** @type string */
        this.label = data.label;

        /** @type {NotificationDestinationInformation} */
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
            case NotificationDestinationTypes.SLACK:
                return 'Slack';
            case NotificationDestinationTypes.DISCORD:
                return 'Discord';
            case NotificationDestinationTypes.TELEGRAM:
                return 'Telegram';
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
                    email: value,
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
           case NotificationDestinationAppToApiTypes[NotificationDestinationTypes.EMAIL]:
               return {
                   type: NotificationDestinationTypes.EMAIL,
                   information: {
                       email: information.email,
                   },
               };
           case NotificationDestinationAppToApiTypes[NotificationDestinationTypes.SLACK]:
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
