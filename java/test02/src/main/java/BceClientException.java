public class BceClientException extends RuntimeException {
    private static final long serialVersionUID = -9085416005820812953L;

    /**
     * Constructs a new BceClientException with the specified detail message.
     *
     * @param message the detail error message.
     */
    public BceClientException(String message) {
        super(message);
    }

    /**
     * Constructs a new BceClientException with the specified detail message and the underlying cause.
     *
     * @param message the detail error message.
     * @param cause   the underlying cause of this exception.
     */
    public BceClientException(String message, Throwable cause) {
        super(message, cause);
    }

}