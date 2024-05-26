import React, { useCallback, useState } from "react";
import Input from "../../../../shared/fields/Input";
import Button from "../../../../shared/buttons/Button";
import Textarea from "../../../../shared/fields/Textarea";
import { createResult } from "../../../../../api/dashboardAPI";
import TypeOrSelect from "../../../../shared/fields/TypeOrSelect";
import { STATUS, STATUSES } from "../../../../../constant/general";
import { toast } from "react-toastify";
import moment from "moment";

const initialForm = {
  repositoryName: "",
  status: STATUSES?.[0]?.value,
  findings: "",
  queuedAt: "",
  scanningAt: "",
  finishedAt: "",
};

const initialErrors = {
  repositoryNameErr: "",
  statusErr: "",
  findingsErr: "",
  queuedAtErr: "",
  scanningAtErr: "",
  finishedAtErr: "",
};

interface ResultsFormProps {
  loadResults: () => void;
}

const ResultsForm = ({ loadResults }: ResultsFormProps) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevForm) => ({
      ...prevForm,
      [name + "Err"]: "",
    }));

    if (name === "status") {
      setErrors(initialErrors);
      setForm((prevForm) => ({
        ...prevForm,
        findings: "",
        scanningAt: "",
        finishedAt: "",
      }));
    }
  }, []);

  const isValid = () => {
    let repositoryNameErr = "";
    let statusErr = "";
    let findingsErr = "";
    let queuedAtErr = "";
    let scanningAtErr = "";
    let finishedAtErr = "";

    let findingsArr = [];

    if (!form.repositoryName) {
      repositoryNameErr = "Repository name is required.";
    }

    if (!form.status) {
      statusErr = "Status is required";
    }

    if (form.status === STATUS.SUCCESS || form.status === STATUS.FAILURE) {
      if (!form.findings) {
        findingsErr = "Findings are required.";
      } else {
        try {
          findingsArr = JSON.parse(form.findings);
          if (!Array.isArray(findingsArr)) {
            findingsErr = "Findings must be an array.";
          } else {
            for (const finding of findingsArr) {
              if (
                !finding.type ||
                !finding.ruleId ||
                !finding.location ||
                !finding.location.path ||
                !finding.location.positions ||
                !finding.location.positions.begin ||
                !finding.location.positions.begin.line ||
                !finding.metadata ||
                !finding.metadata.description ||
                !finding.metadata.severity
              ) {
                findingsErr =
                  "Each finding must have type, ruleId, location (path and begin line), and metadata (description and severity).";
                break;
              }
            }
          }
        } catch (e) {
          findingsErr = "Findings must be a valid JSON array.";
        }
      }
    }

    if (!form.queuedAt) {
      queuedAtErr = "Queued at is required";
    }

    if (
      (form.status === STATUS.IN_PROGRESS ||
        form.status === STATUS.SUCCESS ||
        form.status === STATUS.FAILURE) &&
      !form.scanningAt
    ) {
      scanningAtErr = "Scanning at is required";
    }

    if (
      (form.status === STATUS.SUCCESS || form.status === STATUS.FAILURE) &&
      !form.finishedAt
    ) {
      finishedAtErr = "Finished at is required";
    }

    if (
      repositoryNameErr ||
      statusErr ||
      findingsErr ||
      queuedAtErr ||
      scanningAtErr ||
      finishedAtErr
    ) {
      setErrors({
        ...errors,
        repositoryNameErr,
        statusErr,
        findingsErr,
        queuedAtErr,
        scanningAtErr,
        finishedAtErr,
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) return;

    try {
      setLoading(true);
      await createResult({
        ...form,
        findings:
          (form.status === STATUS.SUCCESS || form.status === STATUS.FAILURE) &&
          form.findings
            ? JSON.parse(form.findings)
            : null,
        queuedAt: form.queuedAt || null,
        scanningAt: form.scanningAt || null,
        finishedAt: form.finishedAt || null,
      });
      setForm(initialForm);
      loadResults();
      toast.success("Security scan results has been submitted.");
    } catch (error) {
      console.log({ error });
      toast.error("Security scan results has not been submitted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-purple-200 p-7 rounded-xl w-full lg:w-[35%]">
      <h1 className="mb-4 text-xl font-bold">Security Scan Submission</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <Input
            label="Repository name"
            name="repositoryName"
            value={form.repositoryName}
            handleChange={handleChange}
            error={errors.repositoryNameErr}
            showRequiredLabel
          />

          <TypeOrSelect
            label="Status"
            name="status"
            labelClass="tracking-[0.28px] text-pp-gray-700"
            className="flex-1 w-full"
            onChange={handleChange}
            options={STATUSES}
            value={form.status}
            error={errors.statusErr}
            showRequiredLabel
          />

          <Textarea
            label="Findings"
            name="findings"
            value={form.findings}
            handleChange={handleChange}
            error={errors.findingsErr}
            showRequiredLabel={
              form.status === STATUS.SUCCESS || form.status === STATUS.FAILURE
            }
            isDisabled={
              !(
                form.status === STATUS.SUCCESS || form.status === STATUS.FAILURE
              )
            }
          />

          <Input
            type="datetime-local"
            label="Queued at"
            name="queuedAt"
            value={form.queuedAt}
            handleChange={handleChange}
            max={moment().format("YYYY-MM-DDTHH:mm")}
            error={errors.queuedAtErr}
            showRequiredLabel
          />

          <Input
            type="datetime-local"
            label="Scanning at"
            name="scanningAt"
            value={form.scanningAt}
            handleChange={handleChange}
            error={errors.scanningAtErr}
            max={moment().format("YYYY-MM-DDTHH:mm")}
            isDisabled={form.status === STATUS.QUEUED}
            showRequiredLabel={
              form.status === STATUS.IN_PROGRESS ||
              form.status === STATUS.SUCCESS ||
              form.status === STATUS.FAILURE
            }
          />

          <Input
            type="datetime-local"
            label="Finished at"
            name="finishedAt"
            value={form.finishedAt}
            handleChange={handleChange}
            error={errors.finishedAtErr}
            max={moment().format("YYYY-MM-DDTHH:mm")}
            isDisabled={
              form.status === STATUS.QUEUED ||
              form.status === STATUS.IN_PROGRESS
            }
            showRequiredLabel={
              form.status === STATUS.SUCCESS || form.status === STATUS.FAILURE
            }
          />

          <div className="flex flex-row gap-2 mt-4">
            <Button
              type="submit"
              variant="primary"
              className="w-[200px]"
              isLoading={loading}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="light"
              handleButton={() => {
                setForm(initialForm);
                setErrors(initialErrors);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResultsForm;
