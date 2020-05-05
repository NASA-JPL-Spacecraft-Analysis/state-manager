package gov.nasa.jpl.fspa.util;

public class StateVariableConstants {
    public static final String DUPLICATE_IDENTIFIER_MESSAGE = "You tried to create some identifier(s) that already exist, "
            + "please remove these and reupload.\n";

    public static final String DUPLICATE_IDENTIFIER_MESSAGE_WITH_DUPLICATES = DUPLICATE_IDENTIFIER_MESSAGE
            + "Duplicate Identifiers: ";

    public static final String INVALID_IDENTIFIER_MESSAGE_WITH_IDENTIFIERS = "You tried to upload a list of enumeration(s) "
            + "with the following invalid identifiers: ";

    public static final String INVALID_STATE_VARIABLES = " You tried to upload some invalid state variable(s), please fix "
            + "them and reupload";

    public static final String INVALID_RELATIONSHIPS = " You tried to upload some invalid relationship(s), please fix "
            + "them and reupload";
}
