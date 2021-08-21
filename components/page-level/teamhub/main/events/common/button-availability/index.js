import React, { useState, useEffect } from "react";
import BackDropLoader from "@sub/backdrop-loader";
import ContentDialog from "@sub/content-dialog";
import Button from "@sub/button";
import useNotification from "@sub/hook-notification";
import Events from "@api/services/Events";

function EventAvailabilityButton({
  buttonType,
  buttonText,
  disabled,
  eventId,
  onAvailabilitySet,
  className,
}) {
  const [loading, setLoading] = useState(false);
  const [_buttonType, setButtonType] = useState(null);
  const [_buttonText, setButtonText] = useState(null);
  const [
    openAvailabilityConfirmationDialog,
    setOpenAvailabilityConfirmationDialog,
  ] = useState(false);

  useEffect(() => {
    setButtonType(buttonType);
  }, [buttonType]);
  useEffect(() => {
    setButtonText(buttonText);
  }, [buttonText]);

  const { showNotificationMsg } = useNotification();

  const setEventAvailability = async (available) => {
    setLoading(true);

    const response = await Events.SetAvailability(eventId, {
      available,
    }).catch(() => null);

    // show error
    if (!response) {
      showNotificationMsg("Could not set availability", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }

    // show success
    showNotificationMsg("Availability set Successfully..!", {
      variant: "success",
      displayIcon: true,
    });
    setButtonType(available ? "success" : "danger");
    setButtonText(available ? "Available" : "Not Available");
    onAvailabilitySet && onAvailabilitySet(available);
    setLoading(false);
  };

  return (
    <>
      {loading && <BackDropLoader />}
      <ContentDialog
        open={openAvailabilityConfirmationDialog}
        setOpen={setOpenAvailabilityConfirmationDialog}
        title={"Event Availability"}
        Body={() => <p>Are you available?</p>}
        confirmText={"Available"}
        dismissText={"Not Available"}
        onConfirm={async () => {
          setOpenAvailabilityConfirmationDialog(false);
          await setEventAvailability(true);
        }}
        onDismiss={async () => {
          setOpenAvailabilityConfirmationDialog(false);
          await setEventAvailability(false);
        }}
        type={"success"}
        cancelType={"danger"}
      />
      <Button
        className={className}
        variant={_buttonType}
        onClick={() => !disabled && setOpenAvailabilityConfirmationDialog(true)}
        disabled={loading || disabled}
      >
        {_buttonText}
      </Button>
    </>
  );
}

export default EventAvailabilityButton;
