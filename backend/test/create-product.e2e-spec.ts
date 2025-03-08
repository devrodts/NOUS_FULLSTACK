import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from 'src/modules/products/application/usecases/products';
import { CreateProductDTO } from 'src/modules/products/domain/interface/dtos/products/create-product.dto';
import { Product } from 'src/modules/products/domain/entities/products.entity';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: ProductsRepository,
          useValue: {
            createUser: jest.fn(), // simulando a criação do produto
          },
        },
      ],
    }).compile();

    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should create a product successfully', async () => {
    // Dados de entrada para criação do produto
    const productDto: CreateProductDTO = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      categoryIds: [],
    };

    // Resultado simulado do repositório
    const createdProduct: Product = {
      _id: 'some-mongo-id',
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      categoryIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      id: 'generated-uuid', // supondo que sua lógica gere esse id adicional
    } as Product;

    // Configura o método do repositório para retornar o produto criado
    (productsRepository.createProduct as jest.Mock).mockResolvedValue(
      createdProduct,
    );

    const result = await createProductUseCase.execute(productDto);
    expect(result).toEqual(createdProduct);
    expect(productsRepository.createProduct).toHaveBeenCalledWith(productDto);
  });
});
