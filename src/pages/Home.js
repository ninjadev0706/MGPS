import React, { useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import Menu from "../components/Menu";
import PurchaseToken from "../components/PurchaseToken";
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addUserMessage } from 'aigentx-chat-widget';

const apiUrl = "https://mercury-bot-ai.cloud:49444";
const options = {
  headers: { "Content-Type": "application/json" }
};

const Home = ({ account, promiseData, depositEth, withdrawEth, fetchData, availableTokenBal }) => {

  const timeRef = useRef(null);
  const [msgStatus, setMsgStatus] = useState(false);
  const [messageId, setMessageId] = useState(null);

  const [isloading, setLoading] = useState(false);

  // get msgId
  const handleNewUserMessage = async (newMessage) => {
    console.log("hahahahhaa");
    setLoading(true);
    // get msgId

    const response = await axios
      .post(
        `${apiUrl}/handle_tasks`,
        {
          "secret": "35e26211fa1d4746bc814f9cb2a478b8",
          "user_id": "777",
          "user_message": newMessage,
          "channel": "facebook",
          "username": "Alice",
          "steps": [{
            "field": "answer",
            "input_getter": "getter_prompt",
            "input_getter_kwargs": { "prompt_var": "ASSISTANT_PROMPT" },
            "no_hallucinations": true
          }]
        },
        options
      )
    const msgId = response?.data?.msgId;
    if (!msgId) {
      setLoading(false); return;
    }

    setMessageId(msgId)

  }

  // check Reply with msgId
  useEffect(() => {
    if (isloading && messageId) {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
      timeRef.current = setInterval(async function () {
        const response = await axios
          .post(
            `${apiUrl}/status`,
            {
              "secret": "35e26211fa1d4746bc814f9cb2a478b8",
              "msgId": messageId
            },
            options
          )
        if (response?.data?.msgStatus === "ok") {
          setMsgStatus(true);
          if (timeRef.current) {
            clearInterval(timeRef.current);
          }
        }
      }, 3000);
    }
  }, [isloading, messageId])

  // get Reply with msgId
  useEffect(() => {
    if (isloading && messageId && msgStatus) {
      (async () => {
        const response = await axios
          .post(
            `${apiUrl}/take`,
            {
              "secret": "35e26211fa1d4746bc814f9cb2a478b8",
              "msgId": messageId
            },
            options
          )
        if (response?.data?.answer) {
          addResponseMessage(response?.data?.answer);
          toggleMsgLoader();
        }
        setLoading(false);
        setMessageId(null);
        setMsgStatus(false);
      })();

    }
  }, [messageId, msgStatus, isloading])

  useEffect(() => {
    console.log("isloading === >", isloading);
    if (isloading) {
      toggleMsgLoader();
    }
  }, [isloading])


  const handleQuickButtonClicked = (e) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  const handleSubmit = (msgText) => {
    // if (msgText.length < 80) {
    //   addUserMessage("Uh oh, please write a bit more.");
    //   return false;
    // }
    // return true;
  }

  return (
    <div className="">
      <Menu />
      <Widget
        title="Aigentx"
        subtitle="Aigentx Chat Bot"
        senderPlaceHolder="Input text ..."
        handleNewUserMessage={handleNewUserMessage}
        handleQuickButtonClicked={handleQuickButtonClicked}
        imagePreview
        handleSubmit={handleSubmit}
        emojis
      />
      <PurchaseToken
        account={account}
        promiseData={promiseData}
        depositEth={depositEth}
        withdrawEth={withdrawEth}
        fetchData={fetchData}
        availableTokenBal={availableTokenBal}
      />
    </div>
  );
};

export default Home;
