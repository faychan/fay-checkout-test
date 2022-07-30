import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import ContainedInput from './components/input';

import './App.css';
import Heading from "./components/heading";
import Steps from "./components/steps";
import CardContainer from "./components/card";
import { GridContainer, GridContainerSize2, GridItem } from "./components/grid";
import ContainedTextArea from "./components/textarea";
import Checkbox from "./components/checkbox";
import TextContainer from "./components/text";
import { FlexContainer, FlexItem } from "./components/flex";
import { ButtonPrimary } from "./components/button";
import PaymentBox from "./components/paymentBox";
import { CenterContainer, CenterItem } from "./components/centerContainer";

const App = () => {

  const [stepActive, setStepActive] = useState(1);
  const [codeGenerated, setCodeGenerated] = useState("");
  const deliveryOptionsData = [
    {
      id: 1,
      name: "GO-SEND",
      price: 15000,
      estimate: "Today", 
    },
    {
      id: 2,
      name: "JNE",
      price: 9000,
      estimate: "2 days"
    },
    {
      id: 3,
      name: "Personal Courier",
      price: 29000,
      estimate: "1 day",
    }
  ];

  const paymentOptionsData = [
    {
      id: 1,
      name: "e-Wallet",
      price: "1,500,000 left"
    }, 
    {
      id: 2,
      name: "Bank Transfer",
      price: null,
    }, 
    {
      id: 3,
      name: "Virtual Account",
      price: null,
    }
  ]

  const { register, handleSubmit, setValue, trigger, control, reset, watch, formState: { errors } } = useForm({mode: "all"});

  const watchAllFields = watch();

  useMemo(() => {
    if(!watchAllFields?.as_dropshipper){
      setValue("dropshipper_name", "");
      setValue("dropshipper_phone_number", "");
    }
  }, [watchAllFields?.as_dropshipper]);

  useEffect(() => {
    register('shipment', { required: true });
    register('payment', { required: true });
  }, []);

  const addCommas = (nStr) => {
    nStr = nStr+"";
    nStr = nStr?.replace(/\D/g, "");
    nStr = nStr?.split(",").join("");
    var x = nStr.split(',');
    var x1 = x[0];
    var x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  };

  const validate = async () => {
    let result;
    if(stepActive === 1){
      if(watchAllFields.as_dropshipper){
        result = await trigger("email", "phone_number", "delivery_address", "dropshipper_name", "dropshipper_phone_number");
      } else {
        result = await trigger("email", "phone_number", "delivery_address");
      }
    } else if(stepActive === 2){
      result = await trigger("shipment", "payment");
    }
    if(result){
      setStepActive((step) => step + 1);
    }
  };

  useEffect(() => {
    if(stepActive === 3){
      let code = [..."ABCDEFGHJKLMNPQRSTUVWXYZ23456789"].map((e, i, a) => a[Math.floor(Math.random() * a.length)]).splice(0,5).join('');
      setCodeGenerated(code);
    }
  }, [stepActive]);

  const resetForm = () => {
    reset({
      email: "",
      phone_number: "",
      delivery_address: "",
      dropshipper_name: "",
      dropshipper_phone_number: "",
      shipment: {},
      payment: {},
    });
    setStepActive(1);
  }
  
  return (
    <div className="App">
      <CardContainer>
        <Steps active={stepActive} />
        {
          stepActive !== 3 ?
            <div onClick={() => setStepActive((step) => step > 1 ? step - 1 : step)} style={{ display: "flex", alignItems: "center", cursor: "pointer"}}>
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
              {
                stepActive === 1 ? "Back to Cart" : stepActive === 2 ? "Back to Delivery" : ""
              }
            </div>
          : null
        }
        <form onSubmit={handleSubmit(console.log)}>
          {
            stepActive === 1 ?
              <GridContainer>
                <GridItem>
                  <Heading as="h2" label="Delivery Details"/>
                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => (
                      <ContainedInput
                        label="Email"
                        name={name}
                        value={value}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                        inputRef={ref} // wire up the input ref
                        error={error}
                        disabled={false}
                        type="email"
                      />
                    )}
                    name="email"
                    control={control}
                    rules={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
                  />
                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => (
                      <ContainedInput
                        label="Phone Number"
                        name={name}
                        value={value}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                        inputRef={ref} // wire up the input ref
                        error={error}
                        disabled={false}
                        type="text"
                      />
                    )}
                    name="phone_number"
                    control={control}
                    rules={{ pattern: /[0-9\+\-\(\)]{6,20}$/ }}
                  />
                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => (
                      <ContainedTextArea
                        label="Delivery Address"
                        name={name}
                        value={value}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                        inputRef={ref} // wire up the input ref
                        error={error}
                        disabled={false}
                      />
                    )}
                    name="delivery_address"
                    control={control}
                    rules={{ required: true, maxLength: 120 }}
                  />
                </GridItem>
                <GridItem style={{ marginTop: "50px" }}>
                  <div style={{ marginBottom: "32px" }}>
                    <Controller
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { error },
                      }) => (
                        <label style={{ cursor: "pointer"}}>
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                          />
                          <span style={{ marginLeft: "8px" }}>Send as Dropshipper</span>
                        </label>
                      )}
                      name="as_dropshipper"
                      control={control}
                    />
                  </div>
                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => (
                      <ContainedInput
                        label="Dropshipper Name"
                        name={name}
                        value={value}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                        inputRef={ref} // wire up the input ref
                        error={error}
                        disabled={!watchAllFields.as_dropshipper}
                        type="text"
                      />
                    )}
                    name="dropshipper_name"
                    control={control}
                    rules={{ required: watchAllFields?.as_dropshipper ? true : false }}
                  />
                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => (
                      <ContainedInput
                        label="Dropshipper Phone Number"
                        name={name}
                        value={value}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                        inputRef={ref} // wire up the input ref
                        error={error}
                        disabled={!watchAllFields?.as_dropshipper}
                        type="text"
                      />
                    )}
                    name="dropshipper_phone_number"
                    control={control}
                    rules={{ required: watchAllFields?.as_dropshipper, pattern: /[0-9\+\-\(\)]{6,20}$/ }}
                  />
                </GridItem>
                <GridItem style={{ borderLeft: "1px solid #FF8A00", padding: "0 19px" }}>
                  <Heading label="Summary" as="h4" boxStyle={{ marginBottom: "-12px" }}/>
                  <TextContainer label="10 items purchased" className="on-desktop-space" />
                  <FlexContainer style={{ marginBottom: "13px"}}>
                    <FlexItem>
                      Cost of goods
                    </FlexItem>
                    <FlexItem>
                      500,000
                    </FlexItem>
                  </FlexContainer>
                  <FlexContainer style={{ marginBottom: "25px"}}>
                    <FlexItem>
                      Dropshipping Fee
                    </FlexItem>
                    <FlexItem>
                      {watchAllFields.as_dropshipper ? "5,900" : "0"}
                    </FlexItem>
                  </FlexContainer>
                  <FlexContainer style={{ marginBottom: "30px"}}>
                    <FlexItem>
                      <Heading label="Total" as="h4"/>
                    </FlexItem>
                    <FlexItem>
                      <Heading label={watchAllFields.as_dropshipper ? "505,900" : "500,000"} as="h4"/>
                    </FlexItem>
                  </FlexContainer>
                  <ButtonPrimary onClick={validate}>Continue as Payment</ButtonPrimary>
                </GridItem>
              </GridContainer>
            : stepActive === 2 ? 
              <GridContainerSize2 size={2}>
                <GridItem>
                  <Heading as="h2" label="Shipment"/>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-start" }}>
                    {
                      deliveryOptionsData.map(dod => {
                        return <PaymentBox onClick={() => setValue("shipment", dod)} name={dod.name} price={addCommas(dod.price)} active={watchAllFields?.shipment?.id === dod.id} />
                      })
                    }
                  </div>
                  <Heading as="h2" label="Payment" boxStyle={{ marginTop: "60px" }}/>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-start" }}>
                    {
                      paymentOptionsData.map(pod => {
                        return <PaymentBox onClick={() => setValue("payment", pod)} name={pod.name} price={pod.price} active={watchAllFields?.payment?.id === pod.id} />
                      })
                    }
                  </div>
                </GridItem>
                <GridItem style={{ borderLeft: "1px solid #FF8A00", padding: "0 19px" }}>
                  <Heading label="Summary" as="h4" boxStyle={{ marginBottom: "-12px" }}/>
                  <TextContainer label="10 items purchased" style={{ marginBottom: "20px", borderBottom: "1px solid #CCCCC"}} />
                  <TextContainer label="Delivery Estimation" style={{ marginBottom: "5px"}} />
                  <TextContainer label={watchAllFields?.shipment?.estimate + " by " + watchAllFields?.shipment?.name} style={{ visibility: watchAllFields?.shipment ? "visible" : "hidden", color: "#1BD97B", marginBottom: "30px"}} />
                  <FlexContainer style={{ marginBottom: "13px"}}>
                    <FlexItem>
                      Cost of goods
                    </FlexItem>
                    <FlexItem>
                      500,000
                    </FlexItem>
                  </FlexContainer>
                  <FlexContainer style={{ marginBottom: "25px"}}>
                    <FlexItem>
                      Dropshipping Fee
                    </FlexItem>
                    <FlexItem>
                      {watchAllFields.as_dropshipper ? "5,900" : "0"}
                    </FlexItem>
                  </FlexContainer>
                  {
                    watchAllFields?.shipment?.name ?
                      <FlexContainer style={{ marginBottom: "25px"}}>
                        <FlexItem>
                          {watchAllFields?.shipment?.name} Fee
                        </FlexItem>
                        <FlexItem>
                          {addCommas(watchAllFields?.shipment?.price)}
                        </FlexItem>
                      </FlexContainer>
                    : null
                  }
                  <FlexContainer style={{ marginBottom: "30px"}}>
                    <FlexItem>
                      <Heading label="Total" as="h4"/>
                    </FlexItem>
                    <FlexItem>
                      <Heading label={watchAllFields.as_dropshipper ? addCommas(505900+(watchAllFields?.shipment?.price || 0)) : addCommas(500000+(watchAllFields?.shipment?.price || 0))} as="h4"/>
                    </FlexItem>
                  </FlexContainer>
                  <ButtonPrimary onClick={validate}>Pay with {watchAllFields?.payment?.name}</ButtonPrimary>
                </GridItem>
              </GridContainerSize2>
            : stepActive === 3 ?
            <GridContainerSize2>
              <GridItem>
                <CenterContainer>
                  <CenterItem>
                    <Heading as="h2" label="Thank you" boxStyle={{ marginBottom: "26px" }} />
                    <TextContainer label={"Order ID: " + codeGenerated} />
                    <TextContainer label={`Your order will be delivered ${watchAllFields?.shipment?.estimate === "Today" ? "today" : "in "+ watchAllFields?.shipment?.estimate} with ${watchAllFields?.shipment?.name}`} boxStyle={{ marginTop: "10px", marginBottom: "60px"}} />
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer"}} onClick={resetForm}>
                      <span className="material-symbols-outlined">
                        arrow_back_ios_new
                      </span>
                      Go to Homepage
                    </div>
                  </CenterItem>
                </CenterContainer>
              </GridItem>
              <GridItem style={{ borderLeft: "1px solid #FF8A00", padding: "0 19px" }}>
                  <Heading label="Summary" as="h4" boxStyle={{ marginBottom: "-12px" }}/>
                  <TextContainer label="10 items purchased" style={{ marginBottom: "22px", borderBottom: "1px solid #CCCCC"}} />
                  <TextContainer label="Delivery Estimation" style={{ marginTop: "22px", marginBottom: "5px"}} />
                  <TextContainer label={watchAllFields?.shipment?.estimate + " by " + watchAllFields?.shipment?.name} style={{ color: "#1BD97B", marginBottom: "22px", borderBottom: "1px solid #CCCCC"}} />
                  <TextContainer label="Payment Method" style={{ marginTop: "22px", marginBottom: "5px"}} />
                  <TextContainer label={watchAllFields?.payment?.name} style={{ color: "#1BD97B", marginBottom: "22px", borderBottom: "1px solid #CCCCC"}} />
                  <FlexContainer style={{ marginBottom: "13px"}}>
                    <FlexItem>
                      Cost of goods
                    </FlexItem>
                    <FlexItem>
                      500,000
                    </FlexItem>
                  </FlexContainer>
                  <FlexContainer style={{ marginBottom: "25px"}}>
                    <FlexItem>
                      Dropshipping Fee
                    </FlexItem>
                    <FlexItem>
                      {watchAllFields.as_dropshipper ? "5,900" : "0"}
                    </FlexItem>
                  </FlexContainer>
                  {
                    watchAllFields?.shipment?.name ?
                      <FlexContainer style={{ marginBottom: "25px"}}>
                        <FlexItem>
                          {watchAllFields?.shipment?.name} Fee
                        </FlexItem>
                        <FlexItem>
                          {addCommas(watchAllFields?.shipment?.price)}
                        </FlexItem>
                      </FlexContainer>
                    : null
                  }
                  <FlexContainer style={{ marginBottom: "30px"}}>
                    <FlexItem>
                      <Heading label="Total" as="h4"/>
                    </FlexItem>
                    <FlexItem>
                      <Heading label={watchAllFields.as_dropshipper ? addCommas(505900+(watchAllFields?.shipment?.price || 0)) : addCommas(500000+(watchAllFields?.shipment?.price || 0))} as="h4"/>
                    </FlexItem>
                  </FlexContainer>
                </GridItem>
            </GridContainerSize2>
            : null
          }
        </form>
      </CardContainer>
    </div>
  );
}

export default App;
