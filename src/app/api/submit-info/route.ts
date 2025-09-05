import { NextRequest, NextResponse } from "next/server";
import { InfoFormDataSchema } from "@/src/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { SubmitInfoResult } from "@/src/lib/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://abitus-api.geia.vip";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    const ocoId = formData.get("ocoId");
    const informacao = formData.get("informacao");
    const data = formData.get("data");

    const validationResult = InfoFormDataSchema.safeParse({
      ocoId: ocoId ? Number(ocoId) : undefined,
      informacao: informacao?.toString(),
      data: data?.toString(),
    });

    if (!validationResult.success) {
      const response: SubmitInfoResult = {
        success: false,
        message: "Dados inválidos. Por favor, verifique os campos.",
        error: validationResult.error.issues[0]?.message || "Erro de validação",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const validated = validationResult.data;

    const url = new URL(
      `${API_BASE_URL}/v1/ocorrencias/informacoes-desaparecido`
    );

    // Create FormData for multipart request
    const apiFormData = new FormData();

    apiFormData.append("ocoId", validated.ocoId.toString());
    apiFormData.append("informacao", validated.informacao);
    apiFormData.append("data", validated.data);

    const files = formData.getAll("files") as File[];
    if (files && files.length > 0) {
      files.forEach((file) => {
        if (file && file.size > 0) {
          apiFormData.append("anexos", file);
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        accept: "*/*",
      },
      body: apiFormData,
      cache: "no-store",
    });

    if (!response.ok) {
      const result: SubmitInfoResult = {
        success: false,
        message: "Erro ao enviar informação. Por favor, tente novamente.",
        error: `Erro ${response.status}: ${response.statusText}`,
      };
      return NextResponse.json(result, { status: response.status });
    }

    const result = await response.json();

    if (validated.ocoId) {
      revalidatePath("/");
    }

    const successResult: SubmitInfoResult = {
      success: true,
      message: "Informação enviada com sucesso! Obrigado por sua contribuição.",
      data: result,
    };

    return NextResponse.json(successResult);
  } catch (error) {
    console.error("Error submitting tip:", error);

    const errorResult: SubmitInfoResult = {
      success: false,
      message:
        "Erro ao enviar informação. Por favor, tente novamente mais tarde.",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };

    return NextResponse.json(errorResult, { status: 500 });
  }
}
